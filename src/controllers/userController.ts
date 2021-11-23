import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';

import { logger } from '../utils/logger';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const response = await userService.createUser(body);

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in userController.createUser: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const createHost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, params } = req;
        const response = await userService.createHost(parseInt(params.userId), body.languagesId);

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in userController.createHost: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const createGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, params } = req;
        const response = await userService.createGuest(parseInt(params.userId), body.stratum, body.studyLevelId, body.civilStatusId);

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in userController.createGuest: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, params } = req;
        const response = await userService.updateUser(parseInt(params.userId), body);

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in userController.updateUser: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const updateHost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, params } = req;
        const response = await userService.updateHost(parseInt(params.userId), body.languagesId);

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in userController.updateHost: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const updateGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, params } = req;
        const response = await userService.updateGuest(parseInt(params.userId), body.stratum, body.studyLevelId, body.civilStatusId);

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in userController.updateGuest: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { params } = req;
        const response = await userService.activateUser(parseInt(params.userId));

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in userController.activateUser: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { params } = req;
        const response = await userService.deactivateUser(parseInt(params.userId));

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in userController.activateUser: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const findUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { params } = req;
        const response = await userService.findUserById(parseInt(params.userId));

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in userController.findUserById: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req;       

        const response = await userService.findAllUsers(Number(query.page));
        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in userController.findAllUsers: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}