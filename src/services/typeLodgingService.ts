
import { TypeLodgingShape } from "../models/DAO/typeLodging";
import * as TypeLodgingRepository from '../repositories/typeLodgingRepository';

export const getLodgingTypeById = async(id:number): Promise<TypeLodgingShape> => {
  return await TypeLodgingRepository.findById(id);
}

export const getAllLodgingsTypes = async (): Promise<Array<TypeLodgingShape>> => {
  return await TypeLodgingRepository.getAllTypesLodging();
}