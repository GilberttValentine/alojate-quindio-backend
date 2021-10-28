import Lodging from "../models/DAO/lodging";

export const create = (lodging: Lodging) => {
  return Lodging.query().insert(lodging);
}