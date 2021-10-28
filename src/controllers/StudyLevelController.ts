import { Request, Response, NextFunction } from 'express';
import * as StudyLevelService from '../services/studyLevelService';

export const getAllStudyLevels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studyLevel = await StudyLevelService.getAllStudyLevels();
        res.send({ message: studyLevel });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}