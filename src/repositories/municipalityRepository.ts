import Municipality, { MunicipalityShape } from "../models/DAO/municipality";

export const findById = async (id: number): Promise<MunicipalityShape> => {
  return Municipality.query().findById(id);
}

export const getAllMunicipalities = async (): Promise<Array<MunicipalityShape>> => {
  return Municipality.query();
}