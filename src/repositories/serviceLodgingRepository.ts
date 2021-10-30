import ServiceLodging from "../models/DAO/serviceLodging";

export const create = async (serviceLodging: object) => {
  return await ServiceLodging.query().insert(serviceLodging);
}

export const findServicesLodgingsByIds = async (lodgingIds: Array<number>) => {
  return await ServiceLodging.query().whereIn('lodging_id', lodgingIds);
}