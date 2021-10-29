import { Request, Response, NextFunction } from 'express';
import * as LodgingService from "../services/lodgingService";
import { logger } from '../utils/logger';

export const createLodging = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body } = req;
    const response = await LodgingService.createLodging(Number(params.userId), body.lodging, body.services);

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
    const status = error.status || 500;

    logger.error(`Error in LodgingController.getAllLodgings: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
  }
}

export const deactivateLodging = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;

    const response = await LodgingService.deactivateLodging(Number(params.userId), Number(params.lodgingId));

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in LodgingController.deactivateLodging: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
  }
}

export const activateLodging = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const response = await LodgingService.activateLodging(Number(params.userId), Number(params.lodgingId));

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in LodgingController.activateLodging: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
  }
}
