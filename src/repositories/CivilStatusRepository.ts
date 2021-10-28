import CivilStatus from '../models/CivilStatus';

export const getAllCivilStatus = async (): Promise<object> => await CivilStatus.query()
