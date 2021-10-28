import * as StudyLevelRepository from '../repositories/studyLevelRepository';

export const getAllStudyLevels = async (): Promise<object> => {
    const studyLevel = await StudyLevelRepository.getAllStudyLevels();

    if (Object.values(studyLevel).length === 0) throw new Error('Study levels not founded');
    
    return studyLevel;
}