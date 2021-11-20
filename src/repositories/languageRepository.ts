import Language from '../models/DAO/language';

export const getAllLanguages = async (): Promise<Language[]> => await Language.query();

export const findLanguageById = async (id: number): Promise<Language> => await Language.query().findById(id);

export const getLanguagesByIds = async (ids: Array<number>): Promise<Language[]> => await Language.query().findByIds(ids);
