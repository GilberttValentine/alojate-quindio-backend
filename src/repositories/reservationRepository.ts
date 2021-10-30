import { Page } from "objection";
import Reservation from "../models/DAO/reservation";
import { logger } from "../utils/logger";

export const create = (reservation: Reservation) => {
  return Reservation.query().insert(reservation);
}

export const validateLodgingDisponibility = (id_lodging: number, startDate: Date, endDate: Date): Promise<Reservation[]> => {
  return Reservation.query().where('lodging_id', id_lodging)
  .whereComposite("start_date","<", startDate)
  .whereComposite("end_date",">", endDate)
  .orWhereBetween("start_date", [startDate, endDate])
  .orWhereBetween("end_date", [startDate, endDate])
}

export const changeReservationState = (id: number, state: number) => {
  return Reservation.query().patch({ actual_state: state }).findById(id)
}

export const findById = (id: number): Promise<Reservation> => {
  return Reservation.query().findById(id);
}

export const listReservationsByUser = (user_id: number, limit_date: Date | null, page?: number): Promise<Page<Reservation>> => {
  let query = Reservation.query().where('user_id', user_id)
  
  if(limit_date) {
    query = query.whereComposite('start_date',">=", limit_date)
  }

  return query.page(page?page:0, 10);
}

export const listReservationsByLodging = (lodging_id: number, limit_date: Date | null, page?: number): Promise<Page<Reservation>> => {
  let query = Reservation.query().where('lodging_id', lodging_id)
  
  if(limit_date) {
    query = query.whereComposite('start_date',">=", limit_date)
  }

  return query.page(page?page:0, 10);
}

export const todayFinalizeReservations = (today: Date) => {
  return Reservation.query().where('end_date', today);
}

export const todayStartReservations = (today: Date) => {
  return Reservation.query().where('start_date', today);
}