import { Request, Response,NextFunction } from 'express'
import * as languageService from '../services/LanguageService'

export const getAllLanguages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const languages = await languageService.getAllLanguages()
        res.send({ message: languages })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}