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
        const response = await userService.createGuest(parseInt(params.userId), body.stratum, body.studyLevelId, body.civilStatus);

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