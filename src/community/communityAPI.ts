import express from 'express';
import dotenv from 'dotenv';
import camelsKeys from "camelcase-keys";
import db from '../db';
dotenv.config();
const community = express();

/**
*  @swagger
*  tags:
*    name: COMMUNITY
*    description: 커뮤니티 API
*/

/**
*  @swagger
*  paths:
*   /community/getCommunityList:
*     get:
*       summary: 커뮤니스트 조회
*       tags: [COMMUNITY]
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
*           description: community list.
*           content:
*             application/json:
*/
community.get('/getCommunityList', async (req: express.Request, res: express.Response) => {
    try {
      const param = JSON.parse(JSON.stringify(req.params));
      const communityDB = require('../community/communityDB');
      const fieldTp = param['fieldTp'];
      const area = param['area'];
      const searchTxt = param['searchTxt'];
      const pageStart = param['pageStart'];
      const pageEnd = param['pageEnd'];
  
      let sql = communityDB.getCommunityList(fieldTp, area, searchTxt, pageStart, pageEnd);
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
*   /community/getCommunityDetail:
*     get:
*       summary: 커뮤니티상세 조회
*       tags: [COMMUNITY]
*       parameters:
*        - in: query
*          name: commuId
*          required: true
*          description: 커뮤니티ID
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
community.get('/getCommunityDetail', async (req: express.Request, res: express.Response) => {
    try {
      const param = JSON.parse(JSON.stringify(req.params));
      const communityDB = require('../community/communityDB');
      const commuId = param['commuId'];
      const email = param['email'];

      let sql = communityDB.getCommunityDetail(commuId, email);
      const rows = await db.query(sql)
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
*   /community/getCommunityCommentList:
*     get:
*       summary: 커뮤니티 댓글 조회
*       tags: [COMMUNITY]
*       parameters:
*        - in: query
*          name: commuId
*          required: false
*          description: 커뮤니티ID
*          type: string
*        - in: query
*          name: email
*          required: false
*          description: 이메일
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
*           description: community comment list.
*           content:
*             application/json:
*/
community.get('/getCommunityCommentList', async (req: express.Request, res: express.Response) => {
    try {
      const param = JSON.parse(JSON.stringify(req.params));
      const communityDB = require('../community/communityDB');
      const commuId = param['commuId'];
      const email = param['email'];
      const pageStart = param['pageStart'];
      const pageEnd = param['pageEnd'];
  
      let sql = communityDB.getCommunityCommentList(commuId, email, pageStart, pageEnd);
      const rows = await db.query(sql);
      const conn = await db.getConnection();
      conn.release();
      if (rows) return res.status(200).json({ result: camelsKeys(rows[0]) });
      else throw console.log('에러발생');
    } catch (err) {
      console.log(err);
    }
  });

module.exports = community;