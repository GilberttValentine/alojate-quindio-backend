import * as MunicipalityRepository from '../repositories/municipalityRepository';

export const getAllMunicipalities = async() => {
  return await MunicipalityRepository.getAllMunicipalities();
}