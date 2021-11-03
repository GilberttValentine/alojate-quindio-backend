import { Page } from "objection";
import Reservation, { ReservationShape } from "../models/DAO/reservation";
import { CANCELLED } from "../utils/constants/reservationConstants/reservationStatesConstants";

export const create = async (reservation: ReservationShape) => {
  await Reservation.query().insert(reservation);
}

export const validateLodgingDisponibility = async(id_lodging: number, startDate: Date, endDate: Date): Promise<ReservationShape[]> => {
  return await Reservation.query().where('lodging_id', id_lodging)
  .whereNot("actual_state", CANCELLED)
  .where(builder => {
    builder.where(builderI => builderI.whereComposite("start_date","<", startDate).whereComposite("end_date",">", endDate))
    .orWhereBetween("start_date", [startDate, endDate])
    .orWhereBetween("end_date", [startDate, endDate])
  })
}

export const changeReservationState = async(id: number, state: number) => {
  await Reservation.query().patch({ actual_state: state }).findById(id)
}

export const findById = async(id: number): Promise<ReservationShape> => {
  return await Reservation.query().findById(id);
}

export const listReservationsByUser = async(user_id: number, limit_date: Date | null, page?: number): Promise<Page<Reservation>> => {
  let query = Reservation.query().where('user_id', user_id)
  
  if(limit_date) {
    query = query.whereComposite('start_date',">=", limit_date)
  }

  return await query.page(page?page:0, 10);
}

export const listReservationsByLodging = async(lodging_id: number, limit_date: Date | null, page?: number): Promise<Page<Reservation>> => {
  let query = Reservation.query().where('lodging_id', lodging_id)
  
  if(limit_date) {
    query = query.whereComposite('start_date',">=", limit_date)
  }

  return await query.page(page?page:0, 10);
}

export const todayFinalizeReservations = async(today: Date): Promise<ReservationShape[]> => {
  return await Reservation.query().where('end_date', today);
}

export const todayStartReservations = async(today: Date): Promise<ReservationShape[]> => {
  return await Reservation.query().where('start_date', today);
}