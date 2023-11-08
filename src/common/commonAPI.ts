import express from 'express';
import dotenv from 'dotenv';
import camelsKeys from "camelcase-keys";
import db from '../db';
dotenv.config();
const common = express();

/**
*  @swagger
*  tags:
*    name: common
*    description: 공통API
*/

/**
 * @swagger
 *  /common/getSysCode:
 *    get:
 *      tags:
 *      - common
 *      description: 시스템코드 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: syscdCd
 *          required: false
 *          description: 시스템코드 코드
 *          type: string
 *        - in: query
 *          name: classCd
 *          required: false
 *          description: 클래스코드
 *          schema:
 *            type: string
 *        - in: query
 *          name: rel01Data
 *          required: false
 *          description: 참조1
 *          type: string
 *        - in: query
 *          name: rel02Data
 *          required: false
 *          description: 참조2
 *          type: string
 *        - in: query
 *          name: useYn
 *          required: false
 *          description: 사용여부
 *          type: string
 *      responses:
 *       200:
 *        description: 테스트 데이터 생성 성공
 */
common.get('/getSysCode', async (req: express.Request, res: express.Response) => {
  try {
    const param = JSON.parse(JSON.stringify(req.params));
    const syscdCd = param['syscdCd'];
    const classCd = param['classCd'];
    const rel01Data = param['rel01Data'];
    const rel02Data = param['rel02Data'];
    const useYn = param['useYn'];
    const commonDB = require('./commonDB');
    const sql = commonDB.getSysCode(syscdCd, classCd, rel01Data, rel02Data, useYn);
    const rows = await db.query(sql); 
    const conn = await db.getConnection(); 
    conn.release(); 
    return res.status(200).json({ result: camelsKeys(rows[0]) });
  } catch (err) {
    console.log(err);
  }
});

module.exports = common;