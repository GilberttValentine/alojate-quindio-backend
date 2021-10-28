import { Request, Response, NextFunction } from 'express'
import * as CivilStatusService from '../services/civilStatusService';

export const getAllCivilStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const civilStatus = await CivilStatusService.getAllCivilStatus();
    res.send({ message: civilStatus });
  } catch (error: any) {
    console.log({ error })
    res.status(500).send({ error: error.message }).end();
    next(error);
  }
}