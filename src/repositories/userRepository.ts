import User, { UserShape } from "../models/DAO/user";

export const findById = async (id: number): Promise<UserShape> => await User.query().findById(id);

export const findByMail = async (mail: string): Promise<UserShape> => await User.query().where('email', mail).first();

export const createUser = async (user: UserShape) => await User.query().insert(user)

export const createHost = async (id: number, user: UserShape) => await User.query().findById(id).patch(user)

export const createGuest = async (id: number, user: UserShape) => await User.query().findById(id).patch(user)

export const updateUser = async (id: number, user: UserShape) => await User.query().findById(id).patch(user)