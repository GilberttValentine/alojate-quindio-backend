export const UserRepository = module.exports;

import User from "../models/DAO/user";

UserRepository.findById = (id: number) => {
  return User.query().findById(id);
}