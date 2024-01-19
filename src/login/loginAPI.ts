import express from 'express';
import dotenv from 'dotenv';
import db from '../db';
import camelsKeys from "camelcase-keys";
import { log } from 'console';
import axios from 'axios';
const session = require("express-session");
const FileStore = require("session-file-store")(session); 
dotenv.config();
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const login = express();

/**
 *  @swagger
 *  tags:
 *    name: LOGIN
 *    description: LOGIN API
 */

// login.use(
//     session({
//       key: "kakaologin",
//       secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
//       resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
//       saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
//       store: new FileStore(),
//     })
//   );

//   login.use(passport.initialize()); // Passport 초기화
//   login.use(passport.session()); // Passport가 세션을 사용하도록 설정

// login.get('/auth/kakao',passport.authenticate('kakao-login'));
// login.get('http://localhost:8080/login/auth/kakao', passport.authenticate('kakao-login', {
//     failureRedirect: 'http://localhost:3000',
// }), (req, res) => {
//     res.redirect('http://localhost:3000');
// });

// login.get('/logout', (req: any, res: any) => {
//     (req as any).logout(); // Type Assertion으로 타입 강제 변경
//     (req as any).session.destroy(); // Type Assertion으로 타입 강제 변경
// });

// passport.use('kakao-login', new KakaoStrategy({
//     clientID: '339e89afa8db6fa34c3139f5395b4ea2',
//     callbackURL: 'http://localhost:8080/login/auth/kakao',
// }, async (accessToken:string, refreshToken:string, profile:any, done:any,req: express.Request, res: express.Response) => {
//     try {
//     const loginDB = require('../login/loginDB');
//     const emailCheckQuery = `SELECT * FROM member WHERE email='${profile._json.kakao_account.email}'`;
//     const checkRow = await db.query(emailCheckQuery);
//     const emailDataLength = checkRow.length.toString();
//     console.log(emailDataLength);
//     console.log(profile._json.kakao_account.email);
//     console.log(profile._json.properties.nickname);
//     console.log(profile._json.properties.profile_image);
//     let sql = loginDB.insertKakaoUserInfo(emailDataLength,profile._json.kakao_account.email,profile._json.properties.nickname);
//     const rows = await db.query(sql);
//     const conn = await db.getConnection();
//     conn.release();
//   } catch (err) {
//     console.log(err);
//   }
// }
// ));
// passport.serializeUser((data:any, done:any) => {
//     console.log('시리얼라이즈 유저', data); // user는 tokenUser다.
//     // 로그인 시, 사용자 데이터를 세션에 저장하는데
//     done(null, {id : data.user.id, accessToken : data.accessToken});
//   });
//   passport.deserializeUser((user:any, done:any) => {
//     // user = {id : data.user.id, accessToken : data.accessToken}
//     console.log('디시리얼라이즈 유저', user);
//     user.findOne({ where: { id:user.id } })
//       .then((result:any) => { // db에서 가져온 유저데이터 결과 result
//         // console.log('디시리얼라이즈에서 찍히는 유저',user);
//         const tokenUser = { user: result, accessToken : user.accessToken}; 
//         done(null, tokenUser); // req.user 에 저장된다.
//       }) // 조회한 정보를 req.user에 저장한다.
//       .catch((error:any) => done(error));
//   });

// login.get('/kakao', passport.authenticate('kakao'));
// //? 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
// login.get('http://localhost:8080/login/auth/kakao',
//     //? 그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
//     passport.authenticate('kakao', {
//        failureRedirect: 'http://localhost:3000', // kakaoStrategy에서 실패한다면 실행
//     }),
//     // kakaoStrategy에서 성공한다면 콜백 실행
//     (req, res) => {
//        res.redirect('http://localhost:3000');
//     },
//  );



// module.exports = () => {
//    passport.use(
//       new KakaoStrategy(
//          {
//             clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
//             callbackURL: 'http://localhost:8080/login/auth/kakao', // 카카오 로그인 Redirect URI 경로
//          },
//          /*
//           * clientID에 카카오 앱 아이디 추가
//           * callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
//           * accessToken, refreshToken: 로그인 성공 후 카카오가 보내준 토큰
//           * profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
//           */
//          async (accessToken:any, refreshToken:any, profile:any, done:any) => {
//             console.log('kakao profile', profile);
//             try {
                
//             } catch (error) {
//                console.error(error);
//                done(error);
//             }
//          },
//       ),
//    );
// };

/**
 *  @swagger
 *  paths:
 *   /login/kakao:
 *     post:
 *       summary: 카카오로그인
 *       tags: [LOGIN]
 *       responses:
 *         "200":
 *           description: member
 *           content:
 *             application/json:
 */
login.post('/kakao', async (req: express.Request, res: express.Response)=>{

  const param = JSON.parse(JSON.stringify(req.body));
  const userInfo = await getUserInfo(param.access_token)
  const email = userInfo.kakao_account.email;
  const name = userInfo.properties.nickname;

  const loginDB = require("../login/loginDB");
  let insertSql = loginDB.insertKakaoMember(email, name);
  await db.query(insertSql);
  let sql = loginDB.getKakaoMember(email);
  const rows = await db.query(sql);
  const conn = await db.getConnection();
  conn.release();

  if (rows) return res.status(200).json({ result: camelsKeys(rows[0]) });
    else throw console.log('에러발생');
})

const getKakaoToken = async (code:string)=>{
  const restApiKey = '339e89afa8db6fa34c3139f5395b4ea2'  // 앱키 - Rest API key
  const data :any={
      grant_type:'authorization_code',
      client_id:restApiKey,
      code
  }
  const queryString = Object.keys(data)
      .map(k=>encodeURIComponent(k)+'='+encodeURIComponent(data[k]))
      .join('&')
  // 카카오 토큰 요청
  const token = await axios.post("https://kauth.kakao.com/oauth/token", queryString, {headers: header})
  // 엑세스 토큰 발급
  return {accessToken:token.data.access_token}
}

const header = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  'Authorization': 'Bearer '
};

const getUserInfo = async (accessToken:string)=>{
  // Authorization: 'Bearer access_token'
  // 엑세스 토큰 헤더에 담기
  header.Authorization +=accessToken
  // 카카오 사용자 정보 조회
  const get = await axios.get("https://kapi.kakao.com/v2/user/me", {headers: header})
  const result = get.data
  return result;
}


/**
 *  @swagger
 *  paths:
 *   /login/getMember:
 *     get:
 *       summary: 유저정보 조회
 *       tags: [LOGIN]
 *       parameters:
 *        - in: query
 *          name: email
 *          required: true
 *          description: 이메일
 *          type: string
 *        - in: query
 *          name: password
 *          required: true
 *          description: 패스워드
 *          type: string
 *       responses:
 *         "200":
 *           description: member
 *           content:
 *             application/json:
 */
login.get(
    "/getMember",
    async (req: express.Request, res: express.Response) => {
      try {
        const param = JSON.parse(JSON.stringify(req.query));
        const loginDB = require("../login/loginDB");
        const email = param["email"];
        const password = param["password"];
  
        let sql = loginDB.getMember(email, password);
        const rows = await db.query(sql);
        const conn = await db.getConnection();
        conn.release();
        if (rows) return res.status(200).json({ result: camelsKeys(rows[0]) });
        else throw console.log("에러발생");
      } catch (err) {
        console.log(err);
      }
    }
  );

  /**
*  @swagger
*  paths:
*   /login/insertMember:
*     post:
*       summary: 멤버 등록
*       tags: [LOGIN]
*       parameters:
*        - in: query
*          name: email
*          required: true
*          description: 이메일
*          type: string
*        - in: query
*          name: password
*          required: true
*          description: 패스워드
*          type: string
*        - in: query
*          name: name
*          required: true
*          description: 이름
*          type: string
*        - in: query
*          name: area
*          required: true
*          description: 지역
*          type: string
*        - in: query
*          name: phone
*          required: true
*          description: 휴대폰번호
*          type: string
*       responses:
*         "200":
*           description: member.
*           content:
*             application/json:
*/
login.post('/insertMember', async (req: express.Request, res: express.Response) => {
    try {
      const param = JSON.parse(JSON.stringify(req.body));
      const loginDB = require('../login/loginDB');
      const email = param['email'];
      const password = param['password'];
      const name = param['name'];
      const area = param['area'];
      const phone = param['phone'];
      const imgUrl = null;
  
      let sql = loginDB.insertMember(email, password, name, area, phone, imgUrl);
      const rows = await db.query(sql);
      const conn = await db.getConnection();
      conn.release();
      if (rows) return res.status(200).json({ result: camelsKeys(rows[0]) });
      else throw console.log('에러발생');
    } catch (err) {
      console.log(err);
    }
  });

module.exports = login;





