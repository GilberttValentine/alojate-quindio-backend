import Lodging from "../models/schema/lodging";
import * as UserRepository from '../repositories/userRepository';
import { NotFoundError } from "../utils/ErrorHandlerMiddleware";

export const createLodging = async (userId: number, lodging: Lodging) => {
  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new NotFoundError("User doesn't exist");
  }

  if(!user.actual_state) {
    throw new Error("User deactivate");
  }

};