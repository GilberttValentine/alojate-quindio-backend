import { raw } from "objection";
import User, { UserShape } from "../models/DAO/user";

export const findAllUsers = async (page: number): Promise<object> => await User.query().page(page, 10)

export const findById = async (id: number): Promise<UserShape> => await User.query().findById(id);

export const findUserById = async (id: number): Promise<UserShape> => {
  const query = User.query()
    .select(
      'users.id',
      'users.first_name',
      'users.second_name',
      'users.first_lastname',
      'users.second_lastname',
      'users.direction',
      'users.email',
      'users.password',
      'users.url_picture',
      'users.actual_state',
      'users.stratum',
      'users.civil_status_id',
      'users.study_level_id',
      'users.role_id',
      raw(`array_agg(distinct jsonb_build_object('id', lan.language_id)) as languages`)
    )
    .leftJoin('hosts_languages as lan', 'lan.user_id', 'users.id')
    .groupBy('users.id')
    .findById(id);

  return await query;
}

export const findByMail = async (mail: string): Promise<UserShape> => await User.query().where('email', mail).first();

export const createUser = async (user: UserShape) => await User.query().insert(user)

export const createHost = async (id: number, role: number) => await User.query().findById(id).patch({ role_id: role })

export const createGuest = async (id: number, user: UserShape) => await User.query().findById(id).patch(user)

export const updateUser = async (id: number, user: UserShape) => await User.query().findById(id).patch(user)
