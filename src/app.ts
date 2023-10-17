import express, { Request, Response, NextFunction } from 'express';

const app:express.Application = express();
const sample = require('./sample')
app.use('/sample', sample)

app.listen(8080)