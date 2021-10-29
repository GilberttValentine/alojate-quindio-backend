import { BusinessError, NotFoundError, UnauthorizedError } from "../utils/ErrorHandlerMiddleware";

import Lodging from "../models/DAO/lodging";
import Service from "../models/schema/service";

import * as LodgingRepository from "../repositories/lodgingRepository";
import * as UserRepository from '../repositories/userRepository';
import * as MunicipalityRepository from '../repositories/municipalityRepository';
import * as ServiceRepository from '../repositories/serviceRepository';
import * as ServiceLodgingRepository from '../repositories/serviceLodgingRepository';

export const createLodging = async (userId: number, lodging: Lodging, services: Array<Service>) => {
  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new NotFoundError("User doesn't exist");
  }

  if (!user.actual_state) {
    throw new BusinessError("User deactivate");
  }

  const municipality = await MunicipalityRepository.findById(lodging.municipality_id);

  if (!municipality) {
    throw new NotFoundError("Municipality doesn't exist");
  }

  const serviceIds = services.map(it => it.id);

  const servicesLodging = await ServiceRepository.findServicesByIds(serviceIds);

  if (servicesLodging.length === 0) {
    throw new NotFoundError("Services not found");
  }

  lodging.user_id = user.id;
  lodging.actual_state = true;

  const lodgingId = (await LodgingRepository.create(lodging)).id;

  servicesLodging.forEach(async (service) => {
    const serviceInfomation = services.find(it => it.id == service.id);

    const serviceLodging = {
      service_id: serviceInfomation?.id,
      lodging_id: lodgingId,
      description: serviceInfomation?.description
    }

    await ServiceLodgingRepository.create(serviceLodging);
  });

};

export const getAllLodgings = async () => {
  return await LodgingRepository.getAllLodgings();
};

export const deactivateLodging = async (userId: number, lodgingId: number) => {
  const user = await UserRepository.findById(userId);

  if (!user) throw new NotFoundError("User doesn't exist");

  const lodging = await LodgingRepository.findById(lodgingId);

  if (!lodging) throw new NotFoundError("Lodging doesn't exist");

  if (lodging.user_id != user.id && user.role != 1) throw new UnauthorizedError("The hosting does not belong to the user");

  if (!lodging.actual_state) throw new BusinessError("The lodging already deactivate");

  lodging.actual_state = false;

  await LodgingRepository.update(lodgingId, lodging);
}

export const activateLodging = async (userId: number, lodgingId: number) => {
  const user = await UserRepository.findById(userId);

  if (!user) throw new NotFoundError("User doesn't exist");

  const lodging = await LodgingRepository.findById(lodgingId);

  if (!lodging) throw new NotFoundError("Lodging doesn't exist");

  if (lodging.user_id != user.id && user.role != 1) throw new UnauthorizedError("The hosting does not belong to the user");

  if (lodging.actual_state) throw new BusinessError("The lodging already activate");

  lodging.actual_state = true;

  await LodgingRepository.update(lodgingId, lodging);
}