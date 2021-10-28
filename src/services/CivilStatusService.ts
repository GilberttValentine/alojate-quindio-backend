
import * as civilStatusRepository from '../repositories/CivilStatusRepository'

export const getAllCivilStatus = async (): Promise<object> => {
    const civilStatus = await civilStatusRepository.getAllCivilStatus()

    if (Object.values(civilStatus).length === 0) throw new Error('Civil status not founded')

    return civilStatus
}