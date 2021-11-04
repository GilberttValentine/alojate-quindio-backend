import { ServiceShape } from '../models/DAO/service';
import * as ServiceRepository from '../repositories/serviceRepository';

export const createService = async (service: ServiceShape) => {
  await ServiceRepository.create(service);
}

export const findAllServices = async () => {
  return await ServiceRepository.findAll();
}