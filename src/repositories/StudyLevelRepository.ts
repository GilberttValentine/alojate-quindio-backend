import StudyLevel from '../models/DAO/studyLevel';

export const getAllStudyLevels = async (): Promise<object> => await StudyLevel.query();
