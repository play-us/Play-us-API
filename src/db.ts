import mysql from 'mysql2/promise';  //promise를 쓰는 이유는 에러발생 시, 에러를 잡기 위해
import 'dotenv/config'

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'play-us.ca59ltoltffi.us-east-2.rds.amazonaws.com',
  user: 'root',
  password: '123qwe```',
  database: 'play-us'
});

export default db;