import ServiceLodging, { ServiceLodgingShape } from "../models/DAO/serviceLodging";

export const create = async (serviceLodging: object): Promise<ServiceLodgingShape> => {
  return await ServiceLodging.query().insert(serviceLodging);
}