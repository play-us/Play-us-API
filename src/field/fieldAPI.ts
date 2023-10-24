import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import db from '../db';

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
*       responses:
*         "200":
*           description: filed list.
*           content:
*             application/json:
*/
field.get('/getFieldList', async (req: express.Request, res: express.Response) => {
  try {
    let sql = 'select * from field'; // db에 content를 넣는 쿼리문 작성;
    const rows = await db.query(sql); //쿼리문 실행 및 rows에 담기
    const conn = await db.getConnection(); // db에서 커넥션을 가져오기
    conn.release(); // 커넥션을 다시 db로 반환
    if (rows) return res.status(200).json({ result: rows });
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
*       responses:
*         "200":
*           description: field.
*           content:
*             application/json:
*/
field.get('/getFieldDetail', async (req: express.Request, res: express.Response) => {
    try {
      let sql = 'select * from field'; // db에 content를 넣는 쿼리문 작성;
      const rows = await db.query(sql); //쿼리문 실행 및 rows에 담기
      const conn = await db.getConnection(); // db에서 커넥션을 가져오기
      conn.release(); // 커넥션을 다시 db로 반환
      if (rows) return res.status(200).json({ result: rows });
      else throw console.log('에러발생');
    } catch (err) {
      console.log(err);
    }
  });
module.exports = field;