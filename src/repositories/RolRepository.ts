import Rol from '../models/Rol';

export const getAllRol = async (): Promise<object> => {
    const result = await Rol.query()
    return result
}