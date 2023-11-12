import express, { Request, Response, NextFunction } from 'express';

const app:express.Application = express();

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