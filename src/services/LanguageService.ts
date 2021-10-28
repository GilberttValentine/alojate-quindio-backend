
import * as languageRepository from '../repositories/LanguageRepository'

export const getAllLanguages = async (): Promise<object> => {
    const languages = await languageRepository.getAllLanguages()

    if (Object.values(languages).length === 0) throw new Error('Languages not founded')

    return languages
}