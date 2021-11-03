import { Request, Response, NextFunction } from 'express';
import * as ReservationService from "../services/reservationService";
import { logger } from '../utils/logger';

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body } = req;
    const response = await ReservationService.createReservation(Number(params.userId), Number(params.lodgingId), body);

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in ReservationController.createReservation: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error)
  }
}

export const validateLodgingDisponibility = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body } = req;
    const response = await ReservationService.validateLodgingDisponibility(Number(params.lodgingId), body.start_date, body.end_date);

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in ReservationController.validateLodgingDisponibility: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error)
  }
}

export const cancelReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const response = await ReservationService.cancelReservation(Number(params.userId), Number(params.reservationId));

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in ReservationController.cancelReservation: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error)
  }
}

export const findReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const response = await ReservationService.findReservation(Number(params.userId), Number(params.reservationId));

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in ReservationController.findReservation: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();

    return next(error)
  }
}

export const listReservationsByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body, query } = req;
    const response = await ReservationService.listReservationsByUser(Number(params.userId), body.filtered_days, Number(query.page));

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in ReservationController.listReservationsByUser: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error)
  }
}

export const listReservationsByLodging = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body, query } = req;
    const response = await ReservationService.listReservationsByLodging(Number(params.userId), Number(params.lodgingId), body.filtered_days, Number(query.page));

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in ReservationController.listReservationsByLodging: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error)
  }
}