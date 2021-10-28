import Rol from '../models/Rol';

export const getAllRol = async (): Promise<object> => await Rol.query()
