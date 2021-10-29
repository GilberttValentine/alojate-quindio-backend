import { Request, Response, NextFunction } from 'express';
import * as LodgingService from "../services/lodgingService";
import { logger } from '../utils/logger';

export const createLodging = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body } = req;
    const response = await LodgingService.createLodging(Number(params.userId), body);

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in LodgingController.createLodging: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
  }
}

export const getAllLodgings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await LodgingService.getAllLodgings();

    res.send(response);
  } catch (error: any) {

    logger.error(`Error in LodgingController.getAllLodgings: ${error.message}`);

    res.status(error.status).send({ 'status': error.status, 'message': error.message }).end();
  }
}
