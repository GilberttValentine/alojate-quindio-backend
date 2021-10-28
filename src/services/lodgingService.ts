const LodgingService = module.exports;

import Lodging from "../models/schema/lodging";
import { UserRepository } from '../repositories/userRepository';

LodgingService.createLodging = async (userId: number, lodging: Lodging) => {
  const user = await UserRepository.findById(userId);

  if(!user) {
    throw new Error("User doesn't exist");
  }

  
};