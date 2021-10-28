import CivilStatus from '../models/DAO/civilStatus';

export const getAllCivilStatus = async (): Promise<object> => await CivilStatus.query();
