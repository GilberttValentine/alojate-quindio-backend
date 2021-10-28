
import * as studyLevelRepository from '../repositories/StudyLevelRepository'

export const getAllStudyLevels = async (): Promise<object> => {
    const studyLevel = await studyLevelRepository.getAllStudyLevels()
    return studyLevel
}