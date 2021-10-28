
import * as rolRepository from '../repositories/RolRepository'

export const getAllRol = async (): Promise<object> => {
    const rol = await rolRepository.getAllRol()
    return rol
}