import express from 'express';
import dotenv from 'dotenv';
import db from '../db';
import camelsKeys from "camelcase-keys";
import { log } from 'console';
dotenv.config();
const login = express();


login.get()
