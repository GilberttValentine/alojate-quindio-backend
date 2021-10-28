
import * as languageRepository from '../repositories/LanguageRepository'

export const getAllLanguages = async (): Promise<object> => {
    const languages = await languageRepository.getAllLanguages()
    return languages
}