import Language from '../models/DAO/language';

export const getAllLanguages = async (): Promise<object> => await Language.query();