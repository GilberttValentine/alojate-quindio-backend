import { Request, Response, NextFunction } from 'express';
import * as LanguageService from '../services/languageService';
import { logger } from '../utils/logger';

export const getAllLanguages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const languages = await LanguageService.getAllLanguages();
    
    res.send({ message: languages });
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in LanguageController.getAllLanguages: ${error.message}`);
    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
  }
}