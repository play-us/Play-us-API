import express from 'express';
import dotenv from 'dotenv';
import db from '../db';
import camelsKeys from "camelcase-keys";
import {FieldPacket, OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket} from 'mysql2/promise';

dotenv.config();
const main = express();

interface queryType {
    tp : [OkPacket | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | OkPacket[] | ProcedureCallPacket, FieldPacket[]] | any | null
}

/**
*  @swagger
*  tags:
*    name: main
*    description: 메인페이지 API
*/

/**
 * @swagger
 *  /main/getMainData:
 *    get:
 *      tags:
 *      - main
 *      description: 메인페이지 데이터 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: email
 *          required: false
 *          description: 이메일
 *          type: string
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
 *      responses:
 *       200:
 *        description: 테스트 데이터 생성 성공
 */
interface mainDataMap {
    cityList: queryType['tp'],
    areaList: queryType['tp'],
    fieldTpList: queryType['tp'],
    fieldList: queryType['tp'],
    commuList: queryType['tp']
}
main.get('/getMainData', async (req: express.Request, res: express.Response) => {
  try {
    let resultMap:mainDataMap = {
        cityList: null,
        areaList: null,
        fieldTpList: null,
        fieldList: null,
        commuList: null
    };
    const param = JSON.parse(JSON.stringify(req.query));
    const commonDB = require('../common/commonDB');
    const fieldDB = require('../field/fieldDB');
    const commuDB = require('../community/communityDB');
    
    const email = param['email'];
    const fieldId = param['fieldId'];
    const fieldTp = param['fieldTp'];
    const area = param['area'];
    const searchTxt = param['searchTxt'];
    const sort = param['sort'];
    const pageStart = param['pageStart'];
    const pageEnd = param['pageEnd'];
    const commuFieldTp = param['commuFieldTp'];
    const commuArea = param['commuArea'];
    const commuSearchTxt = param['commuSearchTxt'];
    const commuPageStart = param['commuPageStart'];
    const commuPageEnd = param['commuPageEnd'];

    //시도리스트
    const cityListSql = commonDB.getSysCode(null, 'SYS005', null, null, '1');
    const cityList = await db.query(cityListSql); 
    resultMap.cityList= camelsKeys(cityList[0]);

    //시군구리스트
    const areaListSql = commonDB.getSysCode(null, 'SYS006', null, null, '1');
    const areaList = await db.query(areaListSql); 
    resultMap.areaList= camelsKeys(areaList[0]);

    //구장종류리스트
    const fieldTpListSql = commonDB.getSysCode(null, 'SYS002', null, null, '1');
    const fieldTpList = await db.query(fieldTpListSql); 
    resultMap.fieldTpList= camelsKeys(fieldTpList[0]);

    // 구장리스트
    const fieldListSql = fieldDB.getFieldList(fieldId, fieldTp, area, searchTxt, sort, pageStart, pageEnd); 
    const fieldList = await db.query(fieldListSql); 
    resultMap.fieldList= camelsKeys(fieldList[0]);

    // 커뮤니티리스트
    const commuListSql = commuDB.getCommunityList(commuFieldTp, commuArea, commuSearchTxt, commuPageStart, commuPageEnd, email);
    const commuList = await db.query(commuListSql); 
    resultMap.commuList= camelsKeys(commuList[0]);

    const conn = await db.getConnection(); 
    conn.release(); 

    return res.status(200).json({ result: resultMap });
  } catch (err) {
    console.log(err);
  }
});

module.exports = main;