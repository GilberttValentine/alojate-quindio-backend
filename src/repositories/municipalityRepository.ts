import { raw } from "objection";
import Municipality, { MunicipalityShape } from "../models/DAO/municipality";

export const findById = async (id: number): Promise<MunicipalityShape> => {
  return Municipality.query().findById(id);
}

export const getAllMunicipalities = async (): Promise<Array<MunicipalityShape>> => {
  return Municipality.query()
    .select(
      'municipalities.id',
      'municipalities.name',
      'municipalities.url_picture',
      raw(`jsonb_build_object('total', COUNT(distinct l)) as lodgings`)
    )
    .leftJoin('lodgings as l', 'l.municipality_id', 'municipalities.id')
    .groupBy(`municipalities.id`);
}