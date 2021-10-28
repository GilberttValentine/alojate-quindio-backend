import StudyLevel from '../models/StudyLevel';

export const getAllStudyLevels = async (): Promise<object> => {
    const result = await StudyLevel.query()
    return result
}