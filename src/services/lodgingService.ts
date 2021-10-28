import Lodging from "../models/schema/lodging";
import * as UserRepository from '../repositories/userRepository';

export const createLodging = async (userId: number, lodging: Lodging) => {
  const user = Object.values(await UserRepository.findById(userId))[0];

  console.log(user);

  if (!user) {
    throw new Error("User doesn't exist");
  }

};