import express from 'express';
import * as CivilStatusController from './civilStatusController';
import * as LanguageController from './languageController';
import * as RoleController from './roleController';
import * as StudyLevelController from './studyLevelController';
import * as LodgingController from './lodgingController';

export const router = express.Router();

router.post('/users/:userId/lodgings', LodgingController.createLodging);

router.get('/civil-status', CivilStatusController.getAllCivilStatus);

router.get('/roles', RoleController.getAllRoles);

router.get('/study-levels', StudyLevelController.getAllStudyLevels);

router.get('/languages', LanguageController.getAllLanguages);