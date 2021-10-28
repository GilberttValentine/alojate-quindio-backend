import Lodging from "../models/DAO/lodging";
import * as LodgingRepository from "../repositories/lodgingRepository";
import * as UserRepository from '../repositories/userRepository';
import { BusinessError, NotFoundError } from "../utils/ErrorHandlerMiddleware";

export const createLodging = async (userId: number, lodging: Lodging) => {
  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new NotFoundError("User doesn't exist");
  }

  if(!user.actual_state) {
    throw new BusinessError("User deactivate");
  }

  lodging.user_id = user.id;
  lodging.actual_state = true;

  await LodgingRepository.create(lodging);
};