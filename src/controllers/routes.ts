import express from 'express'
import * as civilStatusController from './CivilStatusController'
import * as LanguageController from './LanguageController'
import * as RolController from './RolController'
import * as StudyLevelController from './StudyLevelController'

export const router = express.Router();

router.get('/civil_status', civilStatusController.getAllCivilStatus)

router.get('/rols', RolController.getAllRol)

router.get('/study_levels', StudyLevelController.getAllStudyLevels)

router.get('/languages', LanguageController.getAllLanguages)