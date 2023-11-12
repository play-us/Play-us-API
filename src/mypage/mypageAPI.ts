import express from 'express';
import dotenv from 'dotenv';
import db from '../db';
import camelsKeys from "camelcase-keys";
dotenv.config();
const mypage = express();

/**
*  @swagger
*  tags:
*    name: MYPAGE
*    description: 찜목록 API
*/


/**
*  @swagger
*  paths:
*   /mypage/getWishList:
*     get:
*       summary: 구장 찜 리스트 조회
*       tags: [MYPAGE]
*       parameters:
*        - in: query
*          name: fieldId
*          required: false
*          description: 구장 아이디
*          type: string
*        - in: query
*          name: fieldTp
*          required: false
*          description: 구장구분(SYS002)
*          type: string
*        - in: query
*          name: email
*          required: false
*          description: 유저 이메일
*          type: string
*       responses:
*         "200":
*           description: filed list.
*           content:
*             application/json:
*/

mypage.get('/getWishList', async(req: express.Request,res:express.Response)=>{  
    try{
        const param = JSON.parse(JSON.stringify(req.params));
        const fieldDB = require('../mypage/mypageDB'); 
        const fieldId = param['fieldId'];
        const fieldTp = param['fieldTp'];
        const email = param['email'];

        let sql = fieldDB.getWishList(fieldId, fieldTp, email);
        const rows = await db.query(sql)
        const conn = await db.getConnection();
        conn.release();
        if (rows) return res.status(200).json({ result: camelsKeys(rows[0])});
        else throw console.log('에러발생');
    } catch(err){
        console.log(err);
    }
});

module.exports = mypage;