import { NotFoundError } from "../utils/ErrorHandlerMiddleware";
import { ServiceShape } from '../models/DAO/service';
import * as ServiceRepository from '../repositories/serviceRepository';

export const createService = async (service: ServiceShape) => {
  await ServiceRepository.create(service);
}

export const findAllServices = async (): Promise<ServiceShape[]> => {
  return await ServiceRepository.findAll();
}

export const getService = async (serviceId: number): Promise<ServiceShape> => {
  const service = await ServiceRepository.findById(serviceId);

  if (!service) throw new NotFoundError("Service doesn't exist");

  return service;
}

export const editService = async (serviceId: number, name: string) => {
  const service = await ServiceRepository.findById(serviceId);

  if (!service) throw new NotFoundError("Service doesn't exist");

  await ServiceRepository.editService(serviceId, name);
}