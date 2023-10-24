import express, { Request, Response, NextFunction } from 'express';

const app:express.Application = express();

//swagger
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swaggerDoc')));

//sample
const sample = require('./sample')
app.use('/sample', sample)

//field
const field = require('./field/fieldAPI')
app.use('/field', field)

app.listen(8080)