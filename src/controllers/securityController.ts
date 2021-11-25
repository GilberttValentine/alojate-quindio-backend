import { Request, Response, NextFunction } from 'express';
import * as securityService from '../services/securityService';

import { logger } from '../utils/logger';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const response = await securityService.login(body.email, body.password);

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in securityController.login: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
};

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;

        const response = await securityService.validateToken(body.token);

        res.send(response);
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in securityController.validateToken: ${error.message}`);

        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
};