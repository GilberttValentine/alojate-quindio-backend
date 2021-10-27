import express from 'express'
import * as civilStatusController from './CivilStatusController'

export const router = express.Router();

router.get('/civil_status', civilStatusController.getAllCivilStatus)