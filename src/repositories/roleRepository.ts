import Role from '../models/DAO/role';

export const getAllRoles = async (): Promise<object> => await Role.query();
