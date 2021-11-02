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
router.patch('/users/:userId/hosts', UserController.createHost)
router.patch('/users/:userId/guests', UserController.createGuest)
router.put('/users/:userId', UserController.updateUser)
router.put('/users/:userId/hosts', UserController.updateHost)
router.put('/users/:userId/guests', UserController.updateGuest)
router.get('/users', UserController.findAllUsers)
router.patch('/users/:userId/activate', UserController.activateUser)
router.patch('/users/:userId/deactivate', UserController.deactivateUser)
router.get('/users/:userId', UserController.findUserById)

router.get('/civil-status', CivilStatusController.getAllCivilStatus);
router.get('/roles', RoleController.getAllRoles);
router.get('/study-levels', StudyLevelController.getAllStudyLevels);
router.get('/languages', LanguageController.getAllLanguages);