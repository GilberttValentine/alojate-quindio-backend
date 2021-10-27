
import * as civilStatusRepository from '../repositories/CivilStatusRepository'

export const getAllCivilStatus = async (): Promise<object> => {
    const civilStatus = await civilStatusRepository.getAllCivilStatus()
    return civilStatus
}