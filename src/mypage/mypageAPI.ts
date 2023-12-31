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
*          required: true
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
*        - in: query
*          name: reviewPageStart
*          required: false
*          description: 리뷰리스트 페이지시작
*          type: string
*        - in: query
*          name: reviewPageEnd
*          required: false
*          description: 리뷰리스트 페이지끝
*          type: string
*        - in: query
*          name: resvPageStart
*          required: false
*          description: 예약리스트 페이지시작
*          type: string
*        - in: query
*          name: resvPageEnd
*          required: false
*          description: 예약리스트 페이지끝
*          type: string
*        - in: query
*          name: commuPageStart
*          required: false
*          description: 커뮤니티리스트 페이지시작
*          type: string
*        - in: query
*          name: commuPageEnd
*          required: false
*          description: 커뮤니티리스트 페이지끝
*          type: string
*        - in: query
*          name: commuWishPageStart
*          required: false
*          description: 커뮤니티관심리스트 페이지시작
*          type: string
*        - in: query
*          name: commuWishPageEnd
*          required: false
*          description: 커뮤니티관심리스트 페이지끝
*          type: string
*        - in: query
*          name: commuCommentPageStart
*          required: false
*          description: 커뮤니티댓글리스트 페이지시작
*          type: string
*        - in: query
*          name: commuCommentPageEnd
*          required: false
*          description: 커뮤니티댓글리스트 페이지끝
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

        const reviewPageStart = param['reviewPageStart'];
        const reviewPageEnd = param['reviewPageEnd'];

        const resvPageStart = param['resvPageStart'];
        const resvPageEnd = param['resvPageEnd'];

        const commuPageStart = param['commuPageStart'];
        const commuPageEnd = param['commuPageEnd'];

        const commuWishPageStart = param['commuWishPageStart'];
        const commuWishPageEnd = param['commuWishPageEnd'];

        const commuCommentPageStart = param['commuCommentPageStart'];
        const commuCommentPageEnd = param['commuCommentPageEnd'];

        //구장 좋아요 리스트
        const filedLikeListSql = mypageDB.getMyFieldLikeList(email, likePageStart, likePageEnd);
        const filedLikeList = await db.query(filedLikeListSql); 
        resultMap.filedLikeList= camelsKeys(filedLikeList[0]);
        
        //리뷰 리스트
        const reviewListSql = mypageDB.getMyReviewList(email, reviewPageStart, reviewPageEnd);
        const reviewList = await db.query(reviewListSql); 
        resultMap.reviewList= camelsKeys(reviewList[0]);
        
        //예약리스트
        const reservationListSql = fieldDB.getReservation(null, null, email, null, null, null, null, resvPageStart, resvPageEnd);
        const reservationList = await db.query(reservationListSql); 
        resultMap.reservationList= camelsKeys(reservationList[0]);
        
        //커뮤니티리스트
        const commuListSql = mypageDB.getMyCommunityList(email, commuPageStart, commuPageEnd);
        const commuList = await db.query(commuListSql); 
        resultMap.commuList= camelsKeys(commuList[0]);
        
        //커뮤니티관심 리스트
        const commuWishListSql = mypageDB.getMyCommunityWishList(email, commuWishPageStart, commuWishPageEnd);
        const commuWishList = await db.query(commuWishListSql); 
        resultMap.commuWishList= camelsKeys(commuWishList[0]);
        
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


/**
*  @swagger
*  paths:
*   /mypage/getMyCommunityWishList:
*     get:
*       summary: 커뮤니티 관심 리스트
*       tags: [MYPAGE]
*       parameters:
*        - in: query
*          name: email
*          required: true
*          description: 이메일
*          type: string
*        - in: query
*          name: pageStart
*          required: false
*          description: 커뮤니티관심리스트 페이지시작
*          type: string
*        - in: query
*          name: pageEnd
*          required: false
*          description: 커뮤니티관심리스트 페이지끝
*          type: string
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
mypage.get('/getMyCommunityWishList', async (req: express.Request, res: express.Response) => {
    try {
        const param = JSON.parse(JSON.stringify(req.query));
        const mypageDB = require('../mypage/mypageDB');
        const email = param['email'];
        const pageStart = param['pageStart'];
        const pageEnd = param['pageEnd'];
        const sql = mypageDB.getMyCommunityWishList(email, pageStart, pageEnd);
        const rows = await db.query(sql)
        const conn = await db.getConnection();
        conn.release();
        if (rows) return res.status(200).json({ result: camelsKeys(rows[0]) });
        else throw console.log('에러발생');
    } catch (err) {
      console.log(err);
    }
  });

module.exports = mypage;