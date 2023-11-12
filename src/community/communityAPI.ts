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
*        - in: query
*          name: email
*          required: false
*          description: 이메일
*          type: string
*       responses:
*         "200":
*           description: community list.
*           content:
*             application/json:
*/
community.get('/getCommunityList', async (req: express.Request, res: express.Response) => {
    try {
      const param = JSON.parse(JSON.stringify(req.query));
      const communityDB = require('../community/communityDB');
      const fieldTp = param['fieldTp'];
      const area = param['area'];
      const searchTxt = param['searchTxt'];
      const pageStart = param['pageStart'];
      const pageEnd = param['pageEnd'];
      const email = param['email'];
  
      let sql = communityDB.getCommunityList(fieldTp, area, searchTxt, pageStart, pageEnd, email);
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
      const param = JSON.parse(JSON.stringify(req.query));
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
*   /community/insertCommunity:
*     post:
*       summary: 커뮤니티 등록
*       tags: [COMMUNITY]
*       parameters:
*        - in: query
*          name: commuTitle
*          required: true
*          description: 커뮤니티 제목
*          type: string
*        - in: query
*          name: commuTxt
*          required: true
*          description: 커뮤니티 내용
*          type: string
*        - in: query
*          name: area
*          required: true
*          description: 지역(SYS006)
*          type: string
*        - in: query
*          name: email
*          required: false
*          description: 이메일
*          type: string
*        - in: query
*          name: deadLine
*          required: false
*          description: 마감일자
*          type: Date
*        - in: query
*          name: deadLine
*          required: false
*          description: 마감일자
*          type: Date
*        - in: query
*          name: memberCnt
*          required: false
*          description: 모집인원
*          type: number
*        - in: query
*          name: fieldTp
*          required: false
*          description: 구장구분(SYS002)
*          type: string
*       responses:
*         "200":
*           description: field.
*           content:
*             application/json:
*/
community.post('/insertCommunity', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.body));
    const communityDB = require('../community/communityDB');
    const commuTitle = param['commuTitle'];
    const commuTxt = param['commuTxt'];
    const email = param['email'];
    const area = param['area'];
    const deadLine = param['deadLine']; 
    const memberCnt = param['memberCnt']; 
    const fieldTp = param['fieldTp']; 

    let sql = communityDB.insertCommunity(commuTitle, commuTxt, email, area, deadLine, memberCnt, fieldTp);
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
*   /community/updateCommunity:
*     post:
*       summary: 커뮤니티 수정
*       tags: [COMMUNITY]
*       parameters:
*        - in: query
*          name: commuId
*          required: true
*          description: 커뮤니티ID
*          type: string
*        - in: query
*          name: commuTitle
*          required: true
*          description: 커뮤니티 제목
*          type: string
*        - in: query
*          name: commuTxt
*          required: true
*          description: 커뮤니티 내용
*          type: string
*        - in: query
*          name: area
*          required: true
*          description: 지역(SYS006)
*          type: string
*        - in: query
*          name: email
*          required: false
*          description: 이메일
*          type: string
*        - in: query
*          name: deadLine
*          required: false
*          description: 마감일자
*          type: Date
*        - in: query
*          name: deadLine
*          required: false
*          description: 마감일자
*          type: Date
*        - in: query
*          name: memberCnt
*          required: false
*          description: 모집인원
*          type: number
*        - in: query
*          name: fieldTp
*          required: false
*          description: 구장구분(SYS002)
*          type: string
*       responses:
*         "200":
*           description: field.
*           content:
*             application/json:
*/
community.post('/updateCommunity', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.body));
    const communityDB = require('../community/communityDB');
    const commuId = param['commuId'];
    const commuTitle = param['commuTitle'];
    const commuTxt = param['commuTxt'];
    const email = param['email'];
    const area = param['area'];
    const deadLine = param['deadLine']; 
    const memberCnt = param['memberCnt']; 
    const fieldTp = param['fieldTp']; 

    let sql = communityDB.updateCommunity(commuId, commuTitle, commuTxt, email, area, deadLine, memberCnt, fieldTp);
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
*   /community/deleteCommunity:
*     delete:
*       summary: 커뮤니티 삭제
*       tags: [COMMUNITY]
*       parameters:
*        - in: query
*          name: commuId
*          required: true
*          description: 커뮤니티ID
*          type: string
*       responses:
*         "200":
*           description: field.
*           content:
*             application/json:
*/
community.delete('/deleteCommunity', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.query));
    const communityDB = require('../community/communityDB');
    const commuId = param['commuId'];

    let sql = communityDB.deleteCommunity(commuId);
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
      const param = JSON.parse(JSON.stringify(req.query));
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

/**
*  @swagger
*  paths:
*   /community/insertCommunityComment:
*     post:
*       summary: 커뮤니티댓글 등록
*       tags: [COMMUNITY]
*       parameters:
*        - in: query
*          name: commuId
*          required: true
*          description: 커뮤니티ID
*          type: string
*        - in: query
*          name: commentTxt
*          required: true
*          description: 댓글 내용
*          type: string
*        - in: query
*          name: email
*          required: true
*          description: 이메일
*          type: string
*       responses:
*         "200":
*           description: field.
*           content:
*             application/json:
*/
community.post('/insertCommunityComment', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.body));
    const communityDB = require('../community/communityDB');
    const commuId = param['commuId'];
    const commentTxt = param['commentTxt'];
    const email = param['email'];

    let sql = communityDB.insertCommunityComment(commuId, commentTxt, email);
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
*   /community/updateCommunityComment:
*     post:
*       summary: 커뮤니티댓글 수정
*       tags: [COMMUNITY]
*       parameters:
*        - in: query
*          name: commentId
*          required: true
*          description: 커뮤니티 댓글ID
*          type: string
*        - in: query
*          name: commentTxt
*          required: true
*          description: 댓글 내용
*          type: string
*       responses:
*         "200":
*           description: field.
*           content:
*             application/json:
*/
community.post('/updateCommunityComment', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.body));
    const communityDB = require('../community/communityDB');
    const commentId = param['commentId'];
    const commentTxt = param['commentTxt'];

    let sql = communityDB.updateCommunityComment(commentId, commentTxt);
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
*   /community/deleteCommunityComment:
*     delete:
*       summary: 커뮤니티댓글 삭제
*       tags: [COMMUNITY]
*       parameters:
*        - in: query
*          name: commentId
*          required: true
*          description: 커뮤니티 댓글ID
*          type: string
*       responses:
*         "200":
*           description: field.
*           content:
*             application/json:
*/
community.delete('/deleteCommunityComment', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.query));
    const communityDB = require('../community/communityDB');
    const commentId = param['commentId'];
    const commentTxt = param['commentTxt'];

    let sql = communityDB.deleteCommunityComment(commentId);
    const rows = await db.query(sql)
    const conn = await db.getConnection();
    conn.release();
    if (rows) return res.status(200).json({ result: camelsKeys(rows[0]) });
    else throw console.log('에러발생');
  } catch (err) {
    console.log(err);
  }
});

module.exports = community;