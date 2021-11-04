import * as CivilStatusRepository from '../repositories/civilStatusRepository';
import { NotFoundError } from '../utils/ErrorHandlerMiddleware';

export const getAllCivilStatus = async (): Promise<object> => {
    const civilStatus = await CivilStatusRepository.getAllCivilStatus();

    if (Object.values(civilStatus).length === 0) throw new NotFoundError('Civil status not founded');

    return civilStatus;
}