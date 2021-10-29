import { Request, Response, NextFunction } from 'express';
import * as StudyLevelService from '../services/studyLevelService';
import { logger } from '../utils/logger';

export const getAllStudyLevels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studyLevel = await StudyLevelService.getAllStudyLevels();
    
    res.send({ message: studyLevel });
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in StudyLevelController.getAllStudyLevels: ${error.message}`);
    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
  }
}