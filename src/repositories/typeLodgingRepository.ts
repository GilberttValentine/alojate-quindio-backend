import TypeLodging, { TypeLodgingShape } from "../models/DAO/typeLodging";

export const create = async (typeLodging: TypeLodging): Promise<TypeLodgingShape> => {
  return await TypeLodging.query().insert(typeLodging);
}

export const getAllTypesLodging = async (): Promise<Array<TypeLodgingShape>> => {
  return await TypeLodging.query();
}

export const findById = async (id: number): Promise<TypeLodgingShape> => {
  return await TypeLodging.query().findById(id);
}