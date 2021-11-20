import * as LanguageRepository from '../repositories/languageRepository';
import { NotFoundError } from '../utils/ErrorHandlerMiddleware';

export const getAllLanguages = async (): Promise<object> => {
    const languages = await LanguageRepository.getAllLanguages();

    if (Object.values(languages).length === 0) throw new NotFoundError('Languages not founded');

    return languages;
}

export const getLanguagesByIds = async (ids: number[]): Promise<object> => {
    const languages = await LanguageRepository.getLanguagesByIds(ids);

    if (Object.values(languages).length === 0) throw new NotFoundError('Languages not founded');

    return languages;
}