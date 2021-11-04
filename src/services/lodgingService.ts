import { BusinessError, NotFoundError, UnauthorizedError } from "../utils/ErrorHandlerMiddleware";

import { LodgingShape } from "../models/DAO/lodging";
import LodgingFilters from "../models/schema/lodgingFilters";

import * as LodgingRepository from "../repositories/lodgingRepository";
import * as UserRepository from '../repositories/userRepository';
import * as MunicipalityRepository from '../repositories/municipalityRepository';
import * as ServiceRepository from '../repositories/serviceRepository';
import * as ServiceLodgingRepository from '../repositories/serviceLodgingRepository';
import * as TypeLodgingRepository from '../repositories/typeLodgingRepository';
import { ServiceLodgingShape } from "../models/DAO/serviceLodging";

export const createLodging = async (userId: number, lodging: LodgingShape, services: Array<ServiceLodgingShape>) => {
  const user = await UserRepository.findById(userId);

  if (!user) throw new NotFoundError("User doesn't exist");

  if (!user.actual_state) throw new BusinessError("User deactivate");

  const municipality = await MunicipalityRepository.findById(lodging.municipality_id);

  if (!municipality) throw new NotFoundError("Municipality doesn't exist");

  const type = await TypeLodgingRepository.findById(lodging.type_id);

  if (!type) throw new NotFoundError("The type lodging doesn't exist");

  const serviceIds = services.map(it => it.service_id);

  const servicesLodging = await ServiceRepository.findServicesByIds(serviceIds);

  if (servicesLodging.length === 0) throw new NotFoundError("Services not found");

  lodging.user_id = user.id;
  lodging.actual_state = true;
  lodging.qualification = 1.0;

  const lodgingId = (await LodgingRepository.create(lodging)).id;

  servicesLodging.forEach(async (service) => {
    const serviceInfomation = services.find(it => it.service_id == service.id);

    const serviceLodging = {
      service_id: Number(serviceInfomation?.service_id),
      lodging_id: lodgingId,
      description: String(serviceInfomation?.description)
    };

    await ServiceLodgingRepository.create(serviceLodging);
  });
};

export const getLodging = async (lodgingId: number): Promise<LodgingShape> => {
  const lodging = await LodgingRepository.findById(lodgingId);

  if (!lodging) throw new NotFoundError("Lodging doesn't exist");

  return lodging;
}

export const getAllLodgings = async (page: number, filters: LodgingFilters | null): Promise<object> => {
  page = page || page >= 0 ? page : 0;

  return await LodgingRepository.getAllLodgings(page, filters);
};

export const deactivateLodging = async (userId: number, lodgingId: number) => {
  const user = await UserRepository.findById(userId);

  if (!user) throw new NotFoundError("User doesn't exist");

  const lodging = await LodgingRepository.findById(lodgingId);

  if (!lodging) throw new NotFoundError("Lodging doesn't exist");

  if (lodging.user_id != user.id && user.role_id != 1) throw new UnauthorizedError("The hosting does not belong to the user");

  if (!lodging.actual_state) throw new BusinessError("The lodging already deactivate");

  await LodgingRepository.updateActualState(lodgingId, false);
}

export const activateLodging = async (userId: number, lodgingId: number) => {
  const user = await UserRepository.findById(userId);

  if (!user) throw new NotFoundError("User doesn't exist");

  const lodging = await LodgingRepository.findById(lodgingId);

  if (!lodging) throw new NotFoundError("Lodging doesn't exist");

  if (lodging.user_id != user.id && user.role_id != 1) throw new UnauthorizedError("The hosting does not belong to the user");

  if (lodging.actual_state) throw new BusinessError("The lodging already activate");

  await LodgingRepository.updateActualState(lodgingId, true);
}