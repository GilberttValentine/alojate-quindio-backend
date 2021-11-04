import { raw } from "objection";
import Lodging, { LodgingShape } from "../models/DAO/lodging";
import LodgingFilters from "../models/schema/lodgingFilters";

export const create = async (lodging: LodgingShape): Promise<LodgingShape> => {
  return await Lodging.query().insert(lodging);
}

export const recalculateScore = async(idLodging: number, score: number) => {
  await Lodging.query().patch({ qualification: score }).findById(idLodging)
}

export const updateActualState = async (id: number, state: boolean): Promise<number> => {
  return await Lodging.query().findById(id).patch({ actual_state: state });
}

export const update = async (id: number, lodging: LodgingShape): Promise<number> => {
  return await Lodging.query().findById(id).patch(lodging);
}

export const findById = async (id: number): Promise<LodgingShape> => {
  return await Lodging.query().findById(id);
}

export const getAllLodgings = async (page: number, filters: LodgingFilters | null): Promise<object> => {
  const lodgins = Lodging.query()
    .select(
      'lodgings.id as id',
      'lodgings.name as name',
      raw(`jsonb_build_object('id', m.id, 'name', m."name") as municipality`),
      raw(`jsonb_build_object('id', tl.id, 'name', tl."name") as type`),
      'lodgings.persons_amount',
      'lodgings.accesibility',
      'lodgings.direction',
      'lodgings.room_quantity',
      'lodgings.bed_quantity',
      'lodgings.bathroom_quantity',
      'lodgings.night_value',
      raw(`array_agg(jsonb_build_object('id', s.id, 'name', s.name)) as services`),
      'lodgings.actual_state',
      'lodgings.qualification'
    )
    .innerJoin('services_lodgings as sl', 'lodgings.id', 'sl.lodging_id')
    .innerJoin('services as s', 'sl.service_id', 's.id')
    .innerJoin('municipalities as m', 'm.id', 'lodgings.municipality_id')
    .innerJoin('types_lodging as tl', 'tl.id', 'lodgings.type_id')
    .groupByRaw(`lodgings.id, m.id, tl.id`)
    .where((builder) => {
      if (filters) {
        if (filters.municipality_id) builder.orWhere('municipality_id', filters.municipality_id);

        if (filters.persons_amount) builder.orWhere('persons_amount', filters.persons_amount);

        if (filters.minimum_price && filters.maximum_price) builder.orWhereBetween('night_value', [filters.minimum_price, filters.maximum_price]);

        if (filters.type_lodging) builder.orWhere('type_id', filters.type_lodging);

        if (filters.room_quantity) builder.orWhere('room_quantity', filters.room_quantity);

        if (filters.bed_quantity) builder.orWhere('bed_quantity', filters.bed_quantity);

        if (filters.bathroom_quantity) builder.orWhere('bathroom_quantity', filters.bathroom_quantity);

        if (filters.qualification) builder.orWhereBetween('qualification', [filters.qualification, filters.qualification >= 5 ? 0 : 5]);
      }
    })
    .page(page ? page : 0, 10)
    .orderBy('id', 'asc');

  return await lodgins;
}