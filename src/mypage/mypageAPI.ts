import express from 'express';
import dotenv from 'dotenv';
import db from '../db';
import camelsKeys from "camelcase-keys";
import {FieldPacket, OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket} from 'mysql2/promise';
dotenv.config();
const mypage = express();

interface queryType {
    tp : [OkPacket | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | OkPacket[] | ProcedureCallPacket, FieldPacket[]] | any | null
}

/**
*  @swagger
*  tags:
*    name: MYPAGE
*    description: 찜목록 API
*/


/**
*  @swagger
*  paths:
*   /mypage/getMyPageData:
*     get:
*       summary: 마이페이지 조회
*       tags: [MYPAGE]
*       parameters:
*        - in: query
*          name: email
*          required: false
*          description: 이메일
*          type: string
*        - in: query
*          name: likePageStart
*          required: false
*          description: 좋아요리스트 페이지시작
*          type: string
*        - in: query
*          name: likePageEnd
*          required: false
*          description: 좋아요리스트 페이지끝
*          type: string
*       responses:
*         "200":
*           description: filed list.
*           content:
*             application/json:
*/
interface myPageDataMap {
    filedLikeList: queryType['tp'],
    reviewList: queryType['tp']
    reservationList: queryType['tp'],
    commuList: queryType['tp'],
    commuWishList: queryType['tp'],
    commuCommentList: queryType['tp']
}
mypage.get('/getMyPageData', async(req: express.Request,res:express.Response)=>{  
    try{
        let resultMap:myPageDataMap = {
            filedLikeList: null,
            reviewList: null,
            reservationList: null,
            commuList: null,
            commuWishList: null,
            commuCommentList: null
        };
        const param = JSON.parse(JSON.stringify(req.query));
        const fieldDB = require('../field/fieldDB');
        const commuDB = require('../community/communityDB');
        const mypageDB = require('../mypage/mypageDB');
        const email = param['email'];
        const likePageStart = param['likePageStart'];
        const likePageEnd = param['likePageEnd'];
        const commuCommentPageStart = param['commuCommentPageStart'];
        const commuCommentPageEnd = param['commuCommentPageEnd'];

        //구장 좋아요 리스트
        const filedLikeListSql = mypageDB.getLikeList(email, likePageStart, likePageEnd);
        const filedLikeList = await db.query(filedLikeListSql); 
        resultMap.filedLikeList= camelsKeys(filedLikeList[0]);
        
        //리뷰 리스트
        // const reviewListSql = fieldDB.getLikeList(email);
        // const reviewList = await db.query(reviewListSql); 
        // resultMap.reviewList= camelsKeys(reviewList[0]);
        
        //예약리스트
        const reservationListSql = fieldDB.getReservation(null, null, email, null, null, null, null);
        const reservationList = await db.query(reservationListSql); 
        resultMap.reservationList= camelsKeys(reservationList[0]);
        
        //커뮤니티리스트
        const commuListSql = commuDB.getCommunityList(null, null, null, null, null, email);
        const commuList = await db.query(commuListSql); 
        resultMap.commuList= camelsKeys(commuList[0]);
        
        //커뮤니티관심 리스트
        // const commuWishListSql = commuDB.getCommunityList(null, null, null, null, null, email);
        // const commuWishList = await db.query(commuWishListSql); 
        // resultMap.commuWishList= camelsKeys(commuWishList[0]);
        
        //커뮤니티댓글리스트
        const commuCommentListSql = commuDB.getCommunityCommentList(null, email, commuCommentPageStart, commuCommentPageEnd);
        const commuCommentList = await db.query(commuCommentListSql); 
        resultMap.commuCommentList= camelsKeys(commuCommentList[0]);

        const conn = await db.getConnection(); 
        conn.release(); 
    
        return res.status(200).json({ result: resultMap });
    } catch(err){
        console.log(err);
    }
});

module.exports = mypage;