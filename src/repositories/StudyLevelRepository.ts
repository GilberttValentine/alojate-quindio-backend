import StudyLevel from '../models/StudyLevel';

export const getAllStudyLevels = async (): Promise<object> => await StudyLevel.query()
