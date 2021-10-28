import Language from '../models/Language';

export const getAllLanguages= async (): Promise<object> => {
    const result = await Language.query()
    return result
}