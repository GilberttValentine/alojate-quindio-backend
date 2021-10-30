import express from 'express';

import * as CivilStatusController from './civilStatusController';
import * as LanguageController from './languageController';
import * as RoleController from './roleController';
import * as StudyLevelController from './studyLevelController';
import * as LodgingController from './lodgingController';
import * as UserController from './userController'
export const router = express.Router();

router.get('/lodgings', LodgingController.getAllLodgings);
router.post('/users/:userId/lodgings', LodgingController.createLodging);
router.post('/users', UserController.createUser)
router.post('/users/:userId/hosts', UserController.createHost)
router.post('/users/:userId/guests', UserController.createGuest)

router.get('/civil-status', CivilStatusController.getAllCivilStatus);
router.get('/roles', RoleController.getAllRoles);
router.get('/study-levels', StudyLevelController.getAllStudyLevels);
router.get('/languages', LanguageController.getAllLanguages);