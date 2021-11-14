import Service, { ServiceShape } from "../models/DAO/service";

export const create = async (service: ServiceShape): Promise<ServiceShape> => {
  return await Service.query().insert(service);
}

export const findServicesByIds = async (ids: Array<number>): Promise<Array<ServiceShape>> => {
  return await Service.query().findByIds(ids);
}

export const findAll = async (): Promise<Array<ServiceShape>> => {
  return await Service.query();
}

export const findById = async(serviceId: number): Promise<ServiceShape> => {
  return await Service.query().findById(serviceId);
}

export const editService = async(id: number, name: string) => {
  await Service.query().patch({ name: name }).findById(id)
}