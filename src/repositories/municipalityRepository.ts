import Municipality from "../models/DAO/municipality";

export const findById = async (id:number) => {
  return Municipality.query().findById(id);
}

export const getAllMunicipalities = async () => {
  return Municipality.query();
}