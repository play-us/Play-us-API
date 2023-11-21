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
    const param = JSON.parse(JSON.stringify(req.query));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'] || null;
    const fieldTp = param['fieldTp'] || null;
    const area = param['area'] || null;
    const searchTxt = param['searchTxt'] || null;
    const sort = param['sort'] || null;
    const pageStart = param['pageStart'] || null;
    const pageEnd = param['pageEnd'] || null;

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
      const param = JSON.parse(JSON.stringify(req.query));
      const fieldDB = require('../field/fieldDB');
      const fieldId = param['fieldId'] || null;
      const email = param['email'] || null;

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
*   /field/insertField:
*     post:
*       summary: 구장 등록
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldNm
*          required: true
*          description: 구장명
*          type: string
*        - in: query
*          name: fieldTp
*          required: true
*          description: 구장구분(SYS002)
*          type: string
*        - in: query
*          name: area
*          required: true
*          description: 지역(SYS006)
*          type: string
*        - in: query
*          name: addr
*          required: true
*          description: 주소
*          type: string
*        - in: query
*          name: lat
*          required: true
*          description: 위도
*          type: number
*        - in: query
*          name: lng
*          required: true
*          description: 경도
*          type: number
*        - in: query
*          name: openingHours
*          required: true
*          description: 운영시작시간 (HH:MM:SS)
*          type: string
*        - in: query
*          name: closingHours
*          required: true
*          description: 운영종료시간 (HH:MM:SS)
*          type: string
*        - in: query
*          name: price
*          required: true
*          description: 시간당 가격
*          type: number
*        - in: query
*          name: hours
*          required: true
*          description: 예약시간단위
*          type: string
*        - in: query
*          name: note
*          required: true
*          description: 구장정보
*          type: string
*        - in: query
*          name: size
*          required: true
*          description: 구장 사이즈
*          type: string
*        - in: query
*          name: swrmYn
*          required: true
*          description: 샤워실여부(SYS001)
*          type: string
*        - in: query
*          name: parkingTp
*          required: true
*          description: 주차구분(SYS004)
*          type: string
*        - in: query
*          name: rentalSup
*          required: false
*          description: 대여용품
*          type: string
*       responses:
*         "200":
*           description: field.
*           content:
*             application/json:
*/
field.post('/insertField', async (req: express.Request, res: express.Response) => {
    try {
      const param = JSON.parse(JSON.stringify(req.body));
      const fieldDB = require('../field/fieldDB');
      const fieldNm = param['fieldNm'] || null;
      const fieldTp = param['fieldTp'] || null;
      const area = param['area'] || null;
      const addr = param['addr'] || null;
      const lat = param['lat'] || null;
      const lng = param['lng'] || null;
      const openingHours = param['openingHours'] || null;
      const closingHours = param['closingHours'] || null;
      const price = param['price'] || null;
      const hours = param['hours'] || null;
      const note = param['note'] || null;
      const size = param['size'] || null;
      const swrmYn = param['swrmYn'] || null;
      const parkingTp = param['parkingTp'] || null;
      const rentalSup = param['rentalSup'] || null;

      let sql = fieldDB.insertField(fieldNm, fieldTp, area, addr, lat, lng, openingHours, closingHours, price, hours, note, size, swrmYn, parkingTp, rentalSup);
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
*   /field/updateField:
*     post:
*       summary: 구장 수정
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldId
*          required: true
*          description: 구장ID
*          type: string
*        - in: query
*          name: fieldNm
*          required: true
*          description: 구장명
*          type: string
*        - in: query
*          name: fieldTp
*          required: true
*          description: 구장구분(SYS002)
*          type: string
*        - in: query
*          name: area
*          required: true
*          description: 지역(SYS006)
*          type: string
*        - in: query
*          name: addr
*          required: true
*          description: 주소
*          type: string
*        - in: query
*          name: lat
*          required: true
*          description: 위도
*          type: number
*        - in: query
*          name: lng
*          required: true
*          description: 경도
*          type: number
*        - in: query
*          name: openingHours
*          required: true
*          description: 운영시작시간 (HH:MM:SS)
*          type: string
*        - in: query
*          name: closingHours
*          required: true
*          description: 운영종료시간 (HH:MM:SS)
*          type: string
*        - in: query
*          name: price
*          required: true
*          description: 시간당 가격
*          type: number
*        - in: query
*          name: hours
*          required: true
*          description: 예약시간단위
*          type: string
*        - in: query
*          name: note
*          required: true
*          description: 구장정보
*          type: string
*        - in: query
*          name: size
*          required: true
*          description: 구장 사이즈
*          type: string
*        - in: query
*          name: swrmYn
*          required: true
*          description: 샤워실여부(SYS001)
*          type: string
*        - in: query
*          name: parkingTp
*          required: true
*          description: 주차구분(SYS004)
*          type: string
*        - in: query
*          name: rentalSup
*          required: false
*          description: 대여용품
*          type: string
*       responses:
*         "200":
*           description: field.
*           content:
*             application/json:
*/
field.post('/updateField', async (req: express.Request, res: express.Response) => {
    try {
      const param = JSON.parse(JSON.stringify(req.body));
      const fieldDB = require('../field/fieldDB');
      const fieldId = param['fieldId'] || null;
      const fieldNm = param['fieldNm'] || null;
      const fieldTp = param['fieldTp'] || null;
      const area = param['area'] || null;
      const addr = param['addr'] || null;
      const lat = param['lat'] || null;
      const lng = param['lng'] || null;
      const openingHours = param['openingHours'] || null;
      const closingHours = param['closingHours'] || null;
      const price = param['price'] || null;
      const hours = param['hours'] || null;
      const note = param['note'] || null;
      const size = param['size'] || null;
      const swrmYn = param['swrmYn'] || null;
      const parkingTp = param['parkingTp'] || null;
      const rentalSup = param['rentalSup'] || null;

      let sql = fieldDB.updateField(fieldId, fieldNm, fieldTp, area, addr, lat, lng, openingHours, closingHours, price, hours, note, size, swrmYn, parkingTp, rentalSup);
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
*   /field/deleteField:
*     delete:
*       summary: 구장 삭제
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
field.delete('/deleteField', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.query));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'] || null;

    let sql = fieldDB.deleteField(fieldId);
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
    const param = JSON.parse(JSON.stringify(req.query));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'] || null;
    const email = param['email'] || null;

    let sql = fieldDB.getFieldLike(fieldId, email);
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
*   /field/fieldLike:
*     post:
*       summary: 구장좋아요 
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldId
*          required: true
*          description: 구장ID
*          type: string
*        - in: query
*          name: email
*          required: true
*          description: 이메일
*          type: string
*        - in: query
*          name: state
*          required: true
*          description: 좋아요상태 (true 좋아요, false 좋아요취소)
*          type: boolean
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.post('/fieldLike', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.body));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'];
    const email = param['email'];
    const state = param['state'];
    let sql;
    if(state) {
      sql = fieldDB.insertFieldLike(fieldId, email);
    } else {
      sql = fieldDB.deleteFieldLike(fieldId, email);
    }
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
*   /field/getReservation:
*     get:
*       summary: 구장 예약정보 조회
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldId
*          required: false
*          description: 구장ID
*          type: string
*        - in: query
*          name: email
*          required: false
*          description: 이메일
*          type: string
*        - in: query
*          name: resvId
*          required: false
*          description: 예약ID
*          type: string
*        - in: query
*          name: resvDate
*          required: false
*          description: 예약일자
*          type: Date
*        - in: query
*          name: resvStartTime
*          required: false
*          description: 예약시작시간 (HH:MM:SS)
*          type: string
*        - in: query
*          name: resvEndTime
*          required: false
*          description: 예약종료시간 (HH:MM:SS)
*          type: string
*        - in: query
*          name: resvState
*          required: false
*          description: 예약상태 (SYS007)
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
*           description: field like.
*           content:
*             application/json:
*/
field.get('/getReservation', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.query));
    const fieldDB = require('../field/fieldDB');
    const resvId = param['resvId'] || null;
    const fieldId = param['fieldId'] || null;
    const email = param['email'] || null;
    const resvDate = param['resvDate'] || null;
    const resvStartTime = param['resvStartTime'] || null;
    const resvEndTime = param['resvEndTime'] || null;
    const resvState = param['resvState'] || null;
    const pageStart = param['pageStart'] || null;
    const pageEnd = param['pageEnd'] || null;

    let sql = fieldDB.getReservation(resvId, fieldId, email, resvDate, resvStartTime, resvEndTime, resvState, pageStart, pageEnd);
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
*   /field/insertReservation:
*     post:
*       summary: 구장 예약 등록
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldId
*          required: false
*          description: 구장ID
*          type: string
*        - in: query
*          name: email
*          required: false
*          description: 이메일
*          type: string
*        - in: query
*          name: resvDate
*          required: false
*          description: 예약일자
*          type: Date
*        - in: query
*          name: resvStartTime
*          required: false
*          description: 예약시작시간(HH:MM:SS)
*          type: string
*        - in: query
*          name: resvEndTime
*          required: false
*          description: 예약종료시간(HH:MM:SS)
*          type: string
*        - in: query
*          name: resvPrice
*          required: false
*          description: 예약금액
*          type: number
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.post('/insertReservation', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.body));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'];
    const email = param['email'];
    const resvDate = param['resvDate'];
    const resvStartTime = param['resvStartTime'];
    const resvEndTime = param['resvEndTime'];
    const resvPrice = param['resvPrice'];

    let sql = fieldDB.insertReservation(fieldId, email, resvDate, resvStartTime, resvEndTime, resvPrice);
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
*   /field/deleteReservation:
*     delete:
*       summary: 구장 예약 삭제
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: resvId
*          required: false
*          description: 예약ID
*          type: string
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.delete('/deleteReservation', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.query));
    const fieldDB = require('../field/fieldDB');
    const resvId = param['resvId'] || null;

    let sql = fieldDB.getReservation(resvId);
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
*   /field/getFieldReview:
*     get:
*       summary: 구장 리뷰 조회
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldId
*          required: false
*          description: 구장ID
*          type: string
*        - in: query
*          name: email
*          required: false
*          description: 이메일
*          type: string
*        - in: query
*          name: reviewId
*          required: false
*          description: 리뷰ID
*          type: string
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.get('/getFieldReview', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.query));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'] || null;
    const email = param['email'] || null;
    const reviewId = param['reviewId'] || null;

    let sql = fieldDB.getFieldReview(fieldId, email, reviewId);
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
*   /field/insertFieldReview:
*     post:
*       summary: 구장 리뷰 등록
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldId
*          required: true
*          description: 구장ID
*          type: string
*        - in: query
*          name: resvId
*          required: true
*          description: 예약ID
*          type: string
*        - in: query
*          name: email
*          required: true
*          description: 이메일
*          type: string
*        - in: query
*          name: starCnt
*          required: true
*          description: 별점(4.5)
*          type: string
*        - in: query
*          name: reviewCon
*          required: true
*          description: 리뷰내용
*          type: string
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.post('/insertFieldReview', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.body));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'] || null;
    const resvId = param['resvId'] || null;
    const email = param['email'] || null;
    const starCnt = param['starCnt'] || null;
    const reviewCon = param['reviewCon'] || null;

    let sql = fieldDB.insertFieldReview(fieldId, resvId, email, starCnt, reviewCon);
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
*   /field/updateFieldReview:
*     post:
*       summary: 구장 리뷰 수정
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: reviewId
*          required: true
*          description: 리뷰ID
*          type: string
*        - in: query
*          name: starCnt
*          required: true
*          description: 별점(4.5)
*          type: string
*        - in: query
*          name: reviewCon
*          required: true
*          description: 리뷰내용
*          type: string
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.post('/updateFieldReview', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.body));
    const fieldDB = require('../field/fieldDB');
    const reviewId = param['reviewId'] || null;
    const starCnt = param['starCnt'] || null;
    const reviewCon = param['reviewCon'] || null;

    let sql = fieldDB.updateFieldReview(reviewId, starCnt, reviewCon);
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
*   /field/deleteFieldReview:
*     delete:
*       summary: 구장 리뷰 삭제
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: reivewId
*          required: true
*          description: 리뷰ID
*          type: string
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.delete('/deleteFieldReview', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.query));
    const fieldDB = require('../field/fieldDB');
    const reviewId = param['reviewId'];

    let sql = fieldDB.deleteFieldReview(reviewId);
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
*   /field/getReservationImpossibleDate:
*     get:
*       summary: 예약불가능일자 조회
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldId
*          required: true
*          description: 구장ID
*          type: string
*        - in: query
*          name: resvYm
*          required: true
*          description: 예약년월 (YYYY-MM)
*          type: string
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.get('/getReservationImpossibleDate', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.query));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'];
    const resvYm = param['resvYm'];

    let sql = fieldDB.getReservationImpossibleDate(fieldId, resvYm);
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
*   /field/getReservationPossibleTime:
*     get:
*       summary: 예약가능시간 조회
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: fieldId
*          required: true
*          description: 구장ID
*          type: string
*        - in: query
*          name: resvDate
*          required: true
*          description: 예약일자 (YYYY-MM-DD)
*          type: string
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.get('/getReservationPossibleTime', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.query));
    const fieldDB = require('../field/fieldDB');
    const fieldId = param['fieldId'];
    const resvDate = param['resvDate'];

    let sql = fieldDB.getReservationPossibleTime(fieldId, resvDate);
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