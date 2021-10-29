import Lodging from "../models/DAO/lodging";

export const create = async (lodging: Lodging) => {
  return await Lodging.query().insert(lodging);
}

export const recalculateScore = async(idLodging: number, score: number) => {
  await Lodging.query().patch({ qualification: score }).findById(idLodging)
}

export const update = async (id: number, lodging: Lodging) => {
  return await Lodging.query().findById(id).patch(lodging);
}

export const findById = async (id: number) => {
  return await Lodging.query().findById(id);
}

export const getAllLodgings = async () => {
  return await Lodging.query().page(0, 5);
}