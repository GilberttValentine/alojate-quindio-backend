import Role from '../models/DAO/role';

export const getAllRoles = async (): Promise<Role[]> => await Role.query();

export const findById = async (id: number): Promise<Role> => await Role.query().findById(id)