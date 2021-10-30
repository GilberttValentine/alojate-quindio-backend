import StudyLevel from '../models/DAO/studyLevel';

export const getAllStudyLevels = async (): Promise<StudyLevel[]> => await StudyLevel.query();

export const findById = async (id: number): Promise<StudyLevel> => await StudyLevel.query().findById(id)