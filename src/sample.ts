import express from 'express';
import dotenv from 'dotenv';
import db from './db';
import camelsKeys from "camelcase-keys";
dotenv.config();

const sample = express();

/**
*  @swagger
*  tags:
*    name: SAMPLE
*    description: 샘플 API
*/
/**
*  @swagger
*  paths:
*   /sample:
*     get:
*       summary: 샘플
*       tags: [SAMPLE]
*       responses:
*         "200":
*           description: sample.
*           content:
*             application/json:
*/
sample.get('/get', async (req: express.Request, res: express.Response) => {
  try {
    let sql = 'select * from member'; // db에 content를 넣는 쿼리문 작성;
    const rows = await db.query(sql); //쿼리문 실행 및 rows에 담기
    const conn = await db.getConnection(); // db에서 커넥션을 가져오기
    conn.release(); // 커넥션을 다시 db로 반환
    if (rows) return res.status(200).json({ result: camelsKeys(rows) });
    else throw console.log('에러발생');
  } catch (err) {
    console.log(err);
  }
});

module.exports = sample;