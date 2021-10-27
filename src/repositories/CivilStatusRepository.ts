import CivilStatus from '../models/CivilStatus';

export const getAllCivilStatus = async (): Promise<object> => {
    const result = await CivilStatus.query()
    return result
}