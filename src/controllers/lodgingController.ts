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

    return next(error);
  }
}

export const editLodging = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body } = req;
    const response = await LodgingService.editLodging(Number(params.userId), Number(params.lodgingId), body.lodging, body.services);

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in LodgingController.editLodging: ${error.message}`);
    res.status(status).send({ 'status': error.status, 'message': error.message }).end();

    return next(error);
  }
}

export const getAllLodgings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, query } = req;

    const response = await LodgingService.getAllLodgings(Number(query.page), body.filters);

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in LodgingController.getAllLodgings: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();

    return next(error);
  }
}

export const getLodging = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const response = await LodgingService.getLodging(Number(params.lodgingId));

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in LodgingController.getLodging: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();

    return next(error);
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

    return next(error);
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
    
    return next(error);
  }
}

export const getLodgingsByHost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, query, params } = req;

    const response = await LodgingService.getLodgingsByHost(Number(query.page), body.filters, Number(params.userId));

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in LodgingController.getLodgingsByHost: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();

    return next(error);
  }
}

