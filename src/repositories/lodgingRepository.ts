import { raw } from "objection";
import Lodging, { LodgingShape } from "../models/DAO/lodging";
import LodgingFilters from "../models/schema/lodgingFilters";

export const create = async (lodging: LodgingShape): Promise<LodgingShape> => {
  return await Lodging.query().insert(lodging);
}

export const recalculateScore = async (idLodging: number, score: number) => {
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

export const getLodgingById = async(id:number) => {
  return await Lodging.query()
    .select(
      'lodgings.id as id',
      'lodgings.name as name',
      raw(`jsonb_build_object('id', us.id, 'name', us."first_name" || ' ' || us."second_name" || ' ' || us."first_lastname" || ' ' || us."second_lastname" , 'photo', us."url_picture") as user`),
      raw(`jsonb_build_object('id', m.id, 'name', m."name") as municipality`),
      raw(`jsonb_build_object('id', tl.id, 'name', tl."name") as type`),
      'lodgings.persons_amount',
      'lodgings.accesibility',
      'lodgings.direction',
      'lodgings.room_quantity',
      'lodgings.bed_quantity',
      'lodgings.bathroom_quantity',
      'lodgings.night_value',
      raw(`array_agg(distinct jsonb_build_object('id', s.id, 'name', s.name)) as services`),
      'lodgings.actual_state',
      'lodgings.url_pictures',
      raw(`jsonb_build_object('qualification',lodgings.qualification, 'count', COUNT(distinct c)) as comments`),
    )
    .innerJoin('services_lodgings as sl', 'lodgings.id', 'sl.lodging_id')
    .innerJoin('services as s', 'sl.service_id', 's.id')
    .innerJoin('users as us', 'lodgings.user_id', 'us.id')
    .innerJoin('municipalities as m', 'm.id', 'lodgings.municipality_id')
    .innerJoin('types_lodging as tl', 'tl.id', 'lodgings.type_id')
    .leftJoin('comments as c', 'c.lodging_id', 'lodgings.id')
    .groupByRaw(`lodgings.id, m.id, tl.id, us.id`)
    .findById(id);
}

export const getAllLodgings = async (page: number, filters: LodgingFilters | null): Promise<object> => {
  const lodgins = Lodging.query()
    .select(
      'lodgings.id as id',
      'lodgings.name as name',
      raw(`jsonb_build_object('id', us.id, 'name', us."first_name" || ' ' || us."second_name" || ' ' || us."first_lastname" || ' ' || us."second_lastname" , 'photo', us."url_picture") as user`),
      raw(`jsonb_build_object('id', m.id, 'name', m."name") as municipality`),
      raw(`jsonb_build_object('id', tl.id, 'name', tl."name") as type`),
      'lodgings.persons_amount',
      'lodgings.accesibility',
      'lodgings.direction',
      'lodgings.room_quantity',
      'lodgings.bed_quantity',
      'lodgings.bathroom_quantity',
      'lodgings.night_value',
      'lodgings.actual_state',
      'lodgings.url_pictures',
      raw(`jsonb_build_object('qualification',lodgings.qualification, 'count', COUNT(distinct c)) as comments`),
    )
    .innerJoin('services_lodgings as sl', 'lodgings.id', 'sl.lodging_id')
    .innerJoin('users as us', 'lodgings.user_id', 'us.id')
    .innerJoin('municipalities as m', 'm.id', 'lodgings.municipality_id')
    .innerJoin('types_lodging as tl', 'tl.id', 'lodgings.type_id')
    .leftJoin('comments as c', 'c.lodging_id', 'lodgings.id')
    .groupByRaw(`lodgings.id, m.id, tl.id, us.id`)
    .where((builder) => {
      if (filters) {
        if (filters.municipality_id) builder.where('municipality_id', filters.municipality_id);

        if (filters.persons_amount) builder.where('persons_amount', filters.persons_amount);

        if (filters.minimum_price && filters.maximum_price) builder.orWhereBetween('night_value', [filters.minimum_price, filters.maximum_price]);

        if (filters.type_lodging) builder.where('type_id', filters.type_lodging);

        if (filters.room_quantity) builder.where('room_quantity', filters.room_quantity);

        if (filters.bed_quantity) builder.where('bed_quantity', filters.bed_quantity);

        if (filters.bathroom_quantity) builder.where('bathroom_quantity', filters.bathroom_quantity);

        if (filters.qualification) builder.whereBetween('qualification', [filters.qualification, filters.qualification >= 5 ? 0 : 5]);
      }
    })
    .page(page ? page : 0, 10)
    .orderBy('qualification', 'desc');

  return await lodgins;
}

export const getLodgingsByHost = async (page: number, filters: LodgingFilters | null, userId: number): Promise<object> => {
  const lodgins = Lodging.query()
    .select(
      'lodgings.id as id',
      'lodgings.name as name',
      raw(`jsonb_build_object('id', us.id, 'name', us."first_name" || ' ' || us."second_name" || ' ' || us."first_lastname" || ' ' || us."second_lastname" , 'photo', us."url_picture") as user`),
      raw(`jsonb_build_object('id', m.id, 'name', m."name") as municipality`),
      raw(`jsonb_build_object('id', tl.id, 'name', tl."name") as type`),
      'lodgings.persons_amount',
      'lodgings.accesibility',
      'lodgings.direction',
      'lodgings.room_quantity',
      'lodgings.bed_quantity',
      'lodgings.bathroom_quantity',
      'lodgings.night_value',
      raw(`array_agg(distinct jsonb_build_object('id', s.id, 'name', s.name)) as services`),
      'lodgings.actual_state',
      raw(`jsonb_build_object('qualification',lodgings.qualification, 'count', COUNT(distinct c)) as comments`),
    )
    .where('lodgings.user_id', userId)
    .innerJoin('services_lodgings as sl', 'lodgings.id', 'sl.lodging_id')
    .innerJoin('services as s', 'sl.service_id', 's.id')
    .innerJoin('users as us', 'lodgings.user_id', 'us.id')
    .innerJoin('municipalities as m', 'm.id', 'lodgings.municipality_id')
    .innerJoin('types_lodging as tl', 'tl.id', 'lodgings.type_id')
    .leftJoin('comments as c', 'c.lodging_id', 'lodgings.id')
    .groupByRaw(`lodgings.id, m.id, tl.id, us.id`)
    .where((builder) => {
      if (filters) {
        if (filters.lodging_name) builder.whereComposite('lodgings.name', 'LIKE', `%${filters.lodging_name}%`);
        if (filters.lodging_state != undefined) builder.where('lodging.actual_state', filters.lodging_state);
      }
    })
    .page(page ? page : 0, 10)
    .orderBy('id', 'asc');

  return await lodgins;
}


export const getServiceByLodging = async (lodgingId: number): Promise<LodgingShape[]> => {
  return await Lodging.query().where("lodging_id", lodgingId);
}