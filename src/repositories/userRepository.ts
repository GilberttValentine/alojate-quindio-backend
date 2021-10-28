import User from "../models/DAO/user";

export const findById = (id: number) => {
  return User.query().findById(id);
}