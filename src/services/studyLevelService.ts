import * as StudyLevelRepository from '../repositories/studyLevelRepository';
import { NotFoundError } from '../utils/ErrorHandlerMiddleware';

export const getAllStudyLevels = async (): Promise<object> => {
    const studyLevel = await StudyLevelRepository.getAllStudyLevels();

    if (Object.values(studyLevel).length === 0) throw new NotFoundError('Study levels not founded');

    return studyLevel;
}