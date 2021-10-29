import Service from "../models/DAO/service";

export const create = async (service: Service) => {
  return await Service.query().insert(service);
}

export const findServicesByIds = async (ids: Array<number>) => {
  return await Service.query().findByIds(ids);
}

export const findAll = async () => {
  return await Service.query();
}