import express from 'express';
import dotenv from 'dotenv';
import db from '../db';
import camelsKeys from "camelcase-keys";
dotenv.config();
const field = express();

/**
*  @swagger
*  tags:
*    name: FIELD
*    description: 구장 API
*/

/**
*  @swagger
*  paths:
*   /field/getFieldList:
*     get:
*       summary: 구장리스트 조회
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: area
*          required: false
*          description: 지역(SYS006)
*          type: string
*        - in: query
*          name: fieldTp
*          required: false
*          description: 구장구분(SYS002)
*          type: string
*        - in: query
*          name: searchTxt
*          required: false
*          description: 검색
*          type: string
*        - in: query
*          name: sort
*          required: false
*          description: 정렬
*          type: string
*        - in: query
*          name: pageStart
*          required: false
*          description: 페이지시작
*          type: number
*        - in: query
*          name: pageEnd
*          required: false
*          description: 페이지끝
*          type: number
*       responses:
*         "200":
*           description: filed list.
*           content:
*             application/json:
*/
field.get('/getFieldList', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.params));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'];
    const fieldTp = param['fieldTp'];
    const area = param['area'];
    const searchTxt = param['searchTxt'];
    const sort = param['sort'];
    const pageStart = param['pageStart'];
    const pageEnd = param['pageEnd'];

    let sql = fieldDB.getFieldList(fieldId, fieldTp, area, searchTxt, sort, pageStart, pageEnd);
    const rows = await db.query(sql);
    const conn = await db.getConnection();
    conn.release();
    if (rows) return res.status(200).json({ result: camelsKeys(rows[0]) });
    else throw console.log('에러발생');
  } catch (err) {
    console.log(err);
  }
});

/**
*  @swagger
*  paths:
*   /field/getFieldDetail:
*     get:
*       summary: 구장상세 조회
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldId
*          required: true
*          description: 구장ID
*          type: string
*        - in: query
*          name: email
*          required: false
*          description: 이메일
*          type: string
*       responses:
*         "200":
*           description: field.
*           content:
*             application/json:
*/
field.get('/getFieldDetail', async (req: express.Request, res: express.Response) => {
    try {
      const param = JSON.parse(JSON.stringify(req.params));
      const fieldDB = require('../field/fieldDB');
      const fieldId = param['fieldId'];
      const email = param['email'];

      let sql = fieldDB.getFieldDetail(fieldId, email);
      const rows = await db.query(sql)
      const conn = await db.getConnection();
      conn.release();
      if (rows) return res.status(200).json({ result: camelsKeys(rows[0])});
      else throw console.log('에러발생');
    } catch (err) {
      console.log(err);
    }
  });

  /**
*  @swagger
*  paths:
*   /field/getFieldLike:
*     get:
*       summary: 구장좋아요 조회
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldId
*          required: false
*          description: 구장ID
*          type: string
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.get('/getFieldLike', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.params));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'];
    let sql = fieldDB.getFieldLike(fieldId);
    const rows = await db.query(sql)
    const conn = await db.getConnection();
    conn.release();
    if (rows) return res.status(200).json({ result: camelsKeys(rows[0]) });
    else throw console.log('에러발생');
  } catch (err) {
    console.log(err);
  }
});

module.exports = field;