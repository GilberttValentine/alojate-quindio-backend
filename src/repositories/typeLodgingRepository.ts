import TypeLodging from "../models/DAO/typeLodging";

export const create = async (typeLodging: TypeLodging) => {
  return await TypeLodging.query().insert(typeLodging);
}

export const getAllTypesLodging = async () => {
  return await TypeLodging.query();
}

export const findById = async (id: number) => {
  return await TypeLodging.query().findById(id);
}