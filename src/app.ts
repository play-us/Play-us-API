import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app:express.Application = express();
const bodyParser = require("body-parser");

//cors
//app.use(cors()); //모든 접근 허용
app.use(cors({ origin: 'http://localhost:3000'})); //local

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//swagger
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swaggerDoc')));

//sample
const sample = require('./sample')
app.use('/sample', sample)

//common
const common = require('./common/commonAPI')
app.use('/common', common);

//main
const main = require('./main/mainAPI')
app.use('/main', main);

//field
const field = require('./field/fieldAPI')
app.use('/field', field)

//community
const community = require('./community/communityAPI')
app.use('/community', community)

//mypage
const mypage = require('./mypage/mypageAPI')
app.use('/mypage', mypage)

app.listen(8080)