import express from 'express';
import * as CivilStatusController from './civilStatusController';
import * as LanguageController from './languageController';
import * as RoleController from './roleController';
import * as StudyLevelController from './studyLevelController';

export const router = express.Router();

router.get('/civil-status', CivilStatusController.getAllCivilStatus);

router.get('/roles', RoleController.getAllRoles);

router.get('/study-levels', StudyLevelController.getAllStudyLevels);

router.get('/languages', LanguageController.getAllLanguages);