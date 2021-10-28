
import * as studyLevelRepository from '../repositories/StudyLevelRepository'

export const getAllStudyLevels = async (): Promise<object> => {
    const studyLevel = await studyLevelRepository.getAllStudyLevels()

    if (Object.values(studyLevel).length === 0) throw new Error('Study levels not founded')
    return studyLevel
}