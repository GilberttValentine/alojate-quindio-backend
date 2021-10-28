import Lodging from "../models/schema/lodging";
import * as UserRepository from '../repositories/userRepository';

export const createLodging = async (userId: number, lodging: Lodging) => {
  const user = await UserRepository.findById(userId);

  console.log(typeof user);

  if (!user) {
    throw new Error("User doesn't exist");
  }

};