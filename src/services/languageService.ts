import * as LanguageRepository from '../repositories/languageRepository';

export const getAllLanguages = async (): Promise<object> => {
    const languages = await LanguageRepository.getAllLanguages();

    if (Object.values(languages).length === 0) throw new Error('Languages not founded');

    return languages;
}