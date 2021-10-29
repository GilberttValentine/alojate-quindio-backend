import { Request, Response, NextFunction } from 'express'
import * as CivilStatusService from '../services/civilStatusService';
import { logger } from '../utils/logger';

export const getAllCivilStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const civilStatus = await CivilStatusService.getAllCivilStatus();
    
    res.send({ message: civilStatus });
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in CivilStatusController.getAllCivilStatus: ${error.message}`);
    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
  }
}