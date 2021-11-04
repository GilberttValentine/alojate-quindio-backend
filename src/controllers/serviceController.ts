import { Request, Response, NextFunction } from 'express';
import * as ServiceService from '../services/serviceService';
import { logger } from '../utils/logger';

export const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const response = await ServiceService.createService(body);

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in ServiceController.createService: ${error.message}`);
    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
  }
}

export const findAllServices = async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const response = await ServiceService.findAllServices();

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in ServiceController.findAllServices: ${error.message}`);
    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error);
  }
}