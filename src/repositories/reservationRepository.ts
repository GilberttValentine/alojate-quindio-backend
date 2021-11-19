import { Page, raw } from "objection";
import Reservation, { ReservationShape } from "../models/DAO/reservation";
import { CANCELLED } from "../utils/constants/reservationConstants/reservationStatesConstants";

export const create = async (reservation: ReservationShape) => {
  await Reservation.query().insert(reservation);
}

export const validateLodgingDisponibility = async (id_lodging: number, startDate: Date, endDate: Date): Promise<ReservationShape[]> => {
  return await Reservation.query().where('lodging_id', id_lodging)
    .whereNot("actual_state", CANCELLED)
    .where(builder => {
      builder.where(builderI => builderI.whereComposite("start_date", "<", startDate).whereComposite("end_date", ">", endDate))
        .orWhereBetween("start_date", [startDate, endDate])
        .orWhereBetween("end_date", [startDate, endDate])
    })
}

export const changeReservationState = async (id: number, state: number) => {
  await Reservation.query().patch({ actual_state: state }).findById(id)
}

export const findById = async (id: number): Promise<ReservationShape> => {
  return await Reservation.query().findById(id);
}

export const findReservation = async (id: number): Promise<ReservationShape> => {
  return await Reservation.query()
    .select(
      'reservations.id',
      raw(`jsonb_build_object('id', us.id, 'name', us."first_name" || ' ' || us."second_name" || ' ' || us."first_lastname" || ' ' || us."second_lastname" , 'photo', us."url_picture") as guest`),
      raw(`jsonb_build_object('id', hs.id, 'name', hs."first_name" || ' ' || hs."second_name" || ' ' || hs."first_lastname" || ' ' || hs."second_lastname" , 'photo', hs."url_picture") as host`),
      raw(`jsonb_build_object('id', ld.id, 'name', ld.name, 'type', tl.name, 'comments', jsonb_build_object('qualification', ld.qualification, 'count', COUNT(distinct c))::jsonb) as lodging`),
      'reservations.start_date',
      'reservations.end_date',
      'reservations.night_value',
      'reservations.actual_state'
    )
    .findById(id)
    .innerJoin('users as us', 'reservations.user_id', 'us.id')
    .innerJoin('lodgings as ld', 'lodging_id', 'ld.id')
    .innerJoin('users as hs', 'ld.user_id', 'hs.id')
    .innerJoin('types_lodging as tl', 'tl.id', 'ld.type_id')
    .leftJoin('comments as c', 'c.lodging_id', 'ld.id')
    .groupByRaw(`reservations.id, tl.id, us.id, hs.id, ld.id`)
    .orderBy('reservations.id');
}

export const listReservationsByUser = async (user_id: number, code?: number, actual_state?: number, limit_date?: Date | null, page?: number): Promise<Page<Reservation>> => {
  let query = Reservation.query()
    .select(
      'reservations.id',
      'us.id as guest',
      raw(`jsonb_build_object('id', hs.id, 'name', hs."first_name" || ' ' || hs."second_name" || ' ' || hs."first_lastname" || ' ' || hs."second_lastname" , 'photo', hs."url_picture") as host`),
      raw(`jsonb_build_object('id', ld.id, 'name', ld.name, 'type', tl.name, 'comments', jsonb_build_object('qualification', ld.qualification, 'count', COUNT(distinct c))::jsonb) as lodging`),
      'reservations.start_date',
      'reservations.end_date',
      'reservations.night_value',
      'reservations.actual_state'
    )
    .where('reservations.user_id', user_id)
    .innerJoin('users as us', 'reservations.user_id', 'us.id')
    .innerJoin('lodgings as ld', 'lodging_id', 'ld.id')
    .innerJoin('users as hs', 'ld.user_id', 'hs.id')
    .innerJoin('types_lodging as tl', 'tl.id', 'ld.type_id')
    .leftJoin('comments as c', 'c.lodging_id', 'ld.id')
    .groupByRaw(`reservations.id, tl.id, us.id, hs.id, ld.id`)
    .orderBy('reservations.id')

  if (code) {
    query = query.where('id', code);
  }

  if (actual_state) {
    query = query.where('actual_state', actual_state);
  }

  if (limit_date) {
    query = query.whereComposite('start_date', ">=", limit_date);
  }

  return await query.page(page ? page : 0, 10);
}

export const listReservationsByLodging = async (lodging_id: number, code?: number, actual_state?: number, limit_date?: Date | null, page?: number): Promise<Page<Reservation>> => {
  let query = Reservation.query()
    .select(
      'reservations.id',
      raw(`jsonb_build_object('id', us.id, 'name', us."first_name" || ' ' || us."second_name" || ' ' || us."first_lastname" || ' ' || us."second_lastname" , 'photo', us."url_picture") as guest`),
      'hs.id as host',
      raw(`jsonb_build_object('id', ld.id, 'name', ld.name, 'type', tl.name, 'comments', jsonb_build_object('qualification', ld.qualification, 'count', COUNT(distinct c))::jsonb) as lodging`),
      'reservations.start_date',
      'reservations.end_date',
      'reservations.night_value',
      'reservations.actual_state'
    )
    .where('reservations.lodging_id', lodging_id)
    .innerJoin('users as us', 'reservations.user_id', 'us.id')
    .innerJoin('lodgings as ld', 'lodging_id', 'ld.id')
    .innerJoin('users as hs', 'ld.user_id', 'hs.id')
    .innerJoin('types_lodging as tl', 'tl.id', 'ld.type_id')
    .leftJoin('comments as c', 'c.lodging_id', 'ld.id')
    .groupByRaw(`reservations.id, tl.id, us.id, hs.id, ld.id`)
    .orderBy('reservations.id')

  if (code) {
    query = query.where('id', code);
  }

  if (actual_state) {
    query = query.where('actual_state', actual_state);
  }

  if (limit_date) {
    query = query.whereComposite('start_date', ">=", limit_date)
  }

  return await query.page(page ? page : 0, 10);
}

export const todayFinalizeReservations = async (today: Date): Promise<ReservationShape[]> => {
  return await Reservation.query().where('end_date', today);
}

export const todayStartReservations = async (today: Date): Promise<ReservationShape[]> => {
  return await Reservation.query().where('start_date', today);
}

export const findReservationsForHost = async (user_id: number, code?: number, actual_state?: number, limit_date?: Date | null, page?: number): Promise<Page<Reservation>> => {
  let query = Reservation.query()
    .select(
      'reservations.id',
      raw(`jsonb_build_object('id', us.id, 'name', us."first_name" || ' ' || us."second_name", 'photo', us."url_picture") as guest`),
      raw(`jsonb_build_object('id', ld.id, 'name', ld.name, 'type', tl.name, 'comments', jsonb_build_object('qualification', ld.qualification, 'count', COUNT(distinct c))::jsonb) as lodging`),
      'reservations.start_date',
      'reservations.end_date',
      'reservations.night_value',
      'reservations.actual_state'
    )
    .innerJoin('users as us', 'reservations.user_id', 'us.id')
    .innerJoin('lodgings as ld', 'lodging_id', 'ld.id')
    .innerJoin('users as hs', 'ld.user_id', 'hs.id')
    .innerJoin('types_lodging as tl', 'tl.id', 'ld.type_id')
    .leftJoin('comments as c', 'c.lodging_id', 'ld.id')
    .where('ld.user_id', user_id)
    .groupByRaw(`reservations.id, tl.id, us.id, hs.id, ld.id`)
    .orderBy('reservations.id', 'desc')

  if (code) {
    query = query.where('id', code);
  }

  if (actual_state) {
    query = query.where('actual_state', actual_state);
  }

  if (limit_date) {
    query = query.whereComposite('start_date', ">=", limit_date)
  }

  return await query.page(page ? page : 0, 10);
}