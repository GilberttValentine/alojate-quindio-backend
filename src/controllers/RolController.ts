import { Request, Response,NextFunction } from 'express'
import * as RolService from '../services/RolService'

export const getAllRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rol = await RolService.getAllRol()
        res.send({ message: rol })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}