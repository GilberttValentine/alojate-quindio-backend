import { Request, Response, NextFunction } from 'express';
import * as RoleService from '../services/roleService';
import { logger } from '../utils/logger';

export const getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = await RoleService.getAllRoles();

        res.send({ message: role });
    } catch (error: any) {
        const status = error.status || 500;

        logger.error(`Error in RoleController.getAllRoles: ${error.message}`);
        res.status(status).send({ 'status': error.status, 'message': error.message }).end();

        return next(error);
    }
}