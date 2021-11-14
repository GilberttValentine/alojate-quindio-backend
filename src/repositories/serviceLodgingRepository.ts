import ServiceLodging, { ServiceLodgingShape } from "../models/DAO/serviceLodging";

export const create = async (serviceLodging: object): Promise<ServiceLodgingShape> => {
  return await ServiceLodging.query().insert(serviceLodging);
}

export const deleteAllServiceFromLodging = async (lodgingId: number) => {
  return await ServiceLodging.query().delete().where('lodging_id', lodgingId);
}