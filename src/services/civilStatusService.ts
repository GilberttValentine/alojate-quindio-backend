import * as CivilStatusRepository from '../repositories/civilStatusRepository';

export const getAllCivilStatus = async (): Promise<object> => {
    const civilStatus = await CivilStatusRepository.getAllCivilStatus();

    if (Object.values(civilStatus).length === 0) throw new Error('Civil status not founded');

    return civilStatus;
}