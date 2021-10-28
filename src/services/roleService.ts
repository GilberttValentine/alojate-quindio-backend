
import * as RoleRepository from '../repositories/roleRepository';

export const getAllRoles = async (): Promise<object> => {
    const role = await RoleRepository.getAllRoles();

    if (Object.values(role).length === 0) throw new Error('Role not founded');

    return role;
}