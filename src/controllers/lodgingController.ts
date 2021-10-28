import { Request, Response, NextFunction } from 'express';
import * as LodgingService from "../services/lodgingService";

export const createLodging = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body } = req;

    await LodgingService.createLodging(Number(params.userId), body.lodging);
    res.status(200).send({ message: "Lodging created" });
    
  } catch (error: any) {
    console.log({ error });
    res.status(500).send({ error: error.message }).end();
    next(error);
  }
}
