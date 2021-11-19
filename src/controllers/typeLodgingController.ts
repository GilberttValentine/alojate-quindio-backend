import { Request, Response, NextFunction } from 'express';
import * as TypeLodgingService from "../services/typeLodgingService";
import { logger } from '../utils/logger';

export const getAllLodgingsTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await TypeLodgingService.getAllLodgingsTypes();

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in TypeLodgingController.getAllLodgingsTypes: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();

    return next(error);
  }
}