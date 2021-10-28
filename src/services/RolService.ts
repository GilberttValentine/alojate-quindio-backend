
import * as rolRepository from '../repositories/RolRepository'

export const getAllRol = async (): Promise<object> => {
    const rol = await rolRepository.getAllRol()

    if (Object.values(rol).length === 0) throw new Error('Rol not founded')

    return rol
}