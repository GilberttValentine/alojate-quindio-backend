import ServiceLodging from "../models/DAO/serviceLodging";

export const create = async (serviceLodging: object) => {
  return await ServiceLodging.query().insert(serviceLodging);
}