import Language from '../models/Language';

export const getAllLanguages= async (): Promise<object> =>  await Language.query()
