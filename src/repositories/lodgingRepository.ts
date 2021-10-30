import Lodging from "../models/DAO/lodging";

export const create = (lodging: Lodging) => {
  return Lodging.query().insert(lodging);
}

export const getAllLodgings = () => {
  return Lodging.query();
}

export const findById = (id: number) => {
  return Lodging.query().findById(id);
}

export const recalculateScore = (idLodging: number, score: number) => {
  return Lodging.query().patch({ qualification: score }).findById(idLodging)
}