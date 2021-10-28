import { Request, Response, NextFunction } from 'express';
import * as LodgingService from "../services/lodgingService";

export const createLodging = async (req: Request, res: Response, next: NextFunction) => {
  const { params, body } = req;

  return LodgingService.createLodging(Number(params.userId), body)
    .then((response) => res.send(response))
    .catch((error) => {
      console.log(`Error in LodgingController.createLodging: ${error.message}`);

      return next(error);
    });
}
