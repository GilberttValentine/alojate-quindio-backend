import { Request, Response, NextFunction } from 'express';
import * as RoleService from '../services/roleService';

export const getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rol = await RoleService.getAllRoles();
        res.send({ message: rol });
    } catch (error: any) {
        console.log({ error });
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}