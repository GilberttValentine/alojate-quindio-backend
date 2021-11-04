import * as RoleRepository from '../repositories/roleRepository';
import { NotFoundError } from '../utils/ErrorHandlerMiddleware';

export const getAllRoles = async (): Promise<object> => {
    const roles = await RoleRepository.getAllRoles();

    if (Object.values(roles).length === 0) throw new NotFoundError('Roles not founded');

    return roles;
}