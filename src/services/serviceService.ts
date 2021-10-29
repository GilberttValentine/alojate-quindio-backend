import Service from '../models/DAO/service';
import * as ServiceRepository from '../repositories/serviceRepository';

export const createService = async (service: Service) => {
  await ServiceRepository.create(service);
}

export const findAllServices = async () => {
  return await ServiceRepository.findAll();
}