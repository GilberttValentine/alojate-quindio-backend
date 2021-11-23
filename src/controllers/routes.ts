import express from 'express';

import * as CivilStatusController from './civilStatusController';
import * as LanguageController from './languageController';
import * as RoleController from './roleController';
import * as StudyLevelController from './studyLevelController';
import * as LodgingController from './lodgingController';
import * as UserController from './userController'
import * as ReservationController from './reservationController';
import * as CommentController from './commentController';
import * as MunicipalityController from './municipalityController';
import * as ServiceController from './serviceController';
import * as SecurityController from './securityController';
import * as TypeLodgingController from './typeLodgingController';

export const router = express.Router();

router.post('/lodgings', LodgingController.getAllLodgings);
router.post('/user/:userId/lodgings', LodgingController.getLodgingsByHost);
router.get('/lodgings/:lodgingId', LodgingController.getLodging);
router.post('/users/:userId/lodgings', LodgingController.createLodging);
router.put('/users/:userId/lodgings/:lodgingId', LodgingController.editLodging);
router.patch('/users/:userId/lodgings/:lodgingId/deactivate', LodgingController.deactivateLodging);
router.patch('/users/:userId/lodgings/:lodgingId/activate', LodgingController.activateLodging);

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

router.post('/users/:userId/lodgings/:lodgingId/reservations', ReservationController.createReservation);
router.get('/lodgings/:lodgingId/check-valid-dates', ReservationController.validateLodgingDisponibility);
router.patch('/users/:userId/reservations/:reservationId/cancel', ReservationController.cancelReservation);
router.get('/users/:userId/reservations/:reservationId', ReservationController.findReservation);
router.get('/users/:userId/reservations', ReservationController.listReservationsByUser);
router.get('/users/:userId/lodgings/reservations', ReservationController.findReservationsForHost);
router.get('/users/:userId/lodgings/:lodgingId/reservations', ReservationController.listReservationsByLodging);

router.post('/users/:userId/lodgings/:lodgingId/comments', CommentController.createComment);
router.patch('/users/:userId/lodgings/:lodgingId/comments/:commentId', CommentController.editComment);
router.delete('/users/:userId/lodgings/:lodgingId/comments/:commentId', CommentController.deleteComment);
router.get('/lodgings/:lodgingId/comments', CommentController.listCommentsByLodging);

router.get('/services', ServiceController.findAllServices);
router.get('/services/:serviceId', ServiceController.getService);
router.post('/services', ServiceController.createService);
router.put('/services/:serviceId', ServiceController.editService);

router.get('/civil-status', CivilStatusController.getAllCivilStatus);
router.get('/roles', RoleController.getAllRoles);
router.get('/study-levels', StudyLevelController.getAllStudyLevels);
router.get('/languages', LanguageController.getAllLanguages);
router.post('/languages', LanguageController.getLanguagesByIds);
router.get('/municipalities', MunicipalityController.getAllMunicipalities);
router.get('/municipalities/:id', MunicipalityController.getMunicipalityById);
router.get('/type-lodging', TypeLodgingController.getAllLodgingsTypes);
router.get('/type-lodging/:id', TypeLodgingController.getLodgingTypeById);
router.get('/type-lodging', TypeLodgingController.getAllLodgingsTypes);

router.post('/security/login', SecurityController.login);
router.post('/security/validate-token', SecurityController.validateToken);