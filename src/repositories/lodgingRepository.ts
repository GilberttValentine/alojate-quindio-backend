import Lodging from "../models/DAO/lodging";

export const create = (lodging: Lodging) => {
  return Lodging.query().insert(lodging);
}

export const getAllLodgings = () => {
  return Lodging.query();
}

export const findById = async(id: number): Promise<Lodging> => {
  return await Lodging.query().findById(id);
}

export const recalculateScore = async(idLodging: number, score: number) => {
  await Lodging.query().patch({ qualification: score }).findById(idLodging)
}