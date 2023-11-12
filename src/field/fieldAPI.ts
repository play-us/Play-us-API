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
      const param = JSON.parse(JSON.stringify(req.params));
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
*     get:
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
      const param = JSON.parse(JSON.stringify(req.params));
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
*     get:
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
      const param = JSON.parse(JSON.stringify(req.params));
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
*     get:
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
    const param = JSON.parse(JSON.stringify(req.params));
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
    const param = JSON.parse(JSON.stringify(req.params));
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
*          name: resvId
*          required: false
*          description: 이메일
*          type: string
*        - in: query
*          name: email
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
*       responses:
*         "200":
*           description: field like.
*           content:
*             application/json:
*/
field.get('/getReservation', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.params));
    const fieldDB = require('../field/fieldDB');
    const resvId = param['resvId'] || null;
    const fieldId = param['fieldId'] || null;
    const email = param['email'] || null;
    const resvDate = param['resvDate'] || null;
    const resvStartTime = param['resvStartTime'] || null;
    const resvEndTime = param['resvEndTime'] || null;
    const resvState = param['resvState'] || null;

    let sql = fieldDB.getReservation(resvId, fieldId, email, resvDate, resvStartTime, resvEndTime, resvState);
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
*   /field/deleteReservation:
*     get:
*       summary: 구장 예약 삭제
*       tags: [FIELD]
*       parameters:
*        - in: query
*          name: email
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
    const param = JSON.parse(JSON.stringify(req.params));
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

module.exports = field;