import { Request, Response, NextFunction } from 'express';
import * as MunicipalityService from "../services/municipalityService";
import { logger } from '../utils/logger';

export const getAllMunicipalities = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await MunicipalityService.getAllMunicipalities();

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in MunicipalityController.getAllMunicipalities: ${error.message}`);
    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error);
  }
}