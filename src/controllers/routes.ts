import express from 'express'
import { sayHello } from './Hello'
export const router = express.Router();

router.get('/hello', sayHello);