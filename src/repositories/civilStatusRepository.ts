import CivilStatus from '../models/DAO/civilStatus';

export const getAllCivilStatus = async (): Promise<CivilStatus[]> => await CivilStatus.query();

export const findById = async (id: number): Promise<CivilStatus> => await CivilStatus.query().findById(id)