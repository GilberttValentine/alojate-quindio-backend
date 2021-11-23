import { MunicipalityShape } from '../models/DAO/municipality';
import * as MunicipalityRepository from '../repositories/municipalityRepository';

export const getAllMunicipalities = async() => {
  return await MunicipalityRepository.getAllMunicipalities();
}

export const getMunicipalityById = async(id:number): Promise<MunicipalityShape> => {
  return await MunicipalityRepository.findById(id);
}