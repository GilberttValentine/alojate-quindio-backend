import { Request, Response, NextFunction } from 'express';
import * as LanguageService from '../services/languageService';

export const getAllLanguages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const languages = await LanguageService.getAllLanguages();
        res.send({ message: languages });
    } catch (error: any) {
        console.log({ error });
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}