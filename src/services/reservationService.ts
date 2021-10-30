import * as LodgingRepository from "../repositories/lodgingRepository";
import * as UserRepository from '../repositories/userRepository';
import * as ReservationRepository from '../repositories/reservationRepository'
import { BusinessError, NotFoundError, UnauthorizedError } from "../utils/ErrorHandlerMiddleware";
import Reservation from "../models/DAO/reservation";
import { Page } from "objection";
import { ADMIN_ROLE_ID, GUEST_ROLE_ID, HOSTGUEST_ROLE_ID, HOST_ROLE_ID, USER_ROLE_ID } from '../utils/enums/rolesEnum';

export const createReservation = async (userId: number, lodgingId: number, reservation: Reservation) => {
  const user = await UserRepository.findById(userId);

  if(!user) throw new NotFoundError("User doesn't exist");
  
  if(!user.actual_state) throw new BusinessError("User is deactivate");

  if (user.role == GUEST_ROLE_ID || user.role == USER_ROLE_ID) throw new UnauthorizedError("User doesn't have those permissions");

  const lodging = await LodgingRepository.findById(lodgingId);

  if(!lodging) throw new NotFoundError("Lodging doesn't exist");
  
  if(!lodging.actual_state) throw new BusinessError("Lodging is deactivate");
  
  if(reservation.start_date >= reservation.end_date) throw new BusinessError("Invalid time lapse");

  const reservationsCrossed = await ReservationRepository
  .validateLodgingDisponibility(lodgingId, reservation.start_date, reservation.end_date);

  if(reservationsCrossed.length != 0) throw new BusinessError("Lodging already reservate on that date");
  
  reservation.user_id = userId;
  reservation.lodging_id = lodgingId;
  reservation.night_value = lodging.night_value;
  reservation.actual_state = 0;

  await ReservationRepository.create(reservation);
};

export const validateLodgingDisponibility = async (lodgingId: number, startDate: Date, endDate: Date): Promise<object> => {
  const lodging = await LodgingRepository.findById(lodgingId);

  if(!lodging) throw new NotFoundError("Lodging doesn't exist");
  
  if(!lodging.actual_state) throw new BusinessError("Lodging is deactivate");

  if(startDate >= endDate) throw new BusinessError("Invalid time lapse");

  const reservationsCrossed = await ReservationRepository
  .validateLodgingDisponibility(lodgingId, startDate, endDate);

  if(reservationsCrossed.length != 0) throw new BusinessError("Lodging already reservate on that date");

  return {"status": true};
}

export const cancelReservation = async (userId: number, reservationId: number) => {
  const user = await UserRepository.findById(userId);

  if(!user) throw new NotFoundError("User doesn't exist");
  
  if(!user.actual_state) throw new BusinessError("User is deactivate");

  const reservation = await ReservationRepository.findById(reservationId)

  if(!reservation) throw new NotFoundError("Reservation doesn't exist");
  
  if(reservation.actual_state != 0) throw new BusinessError("Reservation cannot be canceled");

  if (user.role == USER_ROLE_ID ) throw new UnauthorizedError("User doesn't have those permissions");

  if ((user.role == GUEST_ROLE_ID || user.role == HOSTGUEST_ROLE_ID) && reservation.user_id != userId) throw new UnauthorizedError("User doesn't have those permissions");

  const lodging = await LodgingRepository.findById(reservation.lodging_id)

  if ((user.role == HOST_ROLE_ID || user.role == HOSTGUEST_ROLE_ID) && lodging.user_id != userId) throw new UnauthorizedError("User doesn't have those permissions");

  await ReservationRepository.changeReservationState(reservationId, 3);
}

export const findReservation = async (userId: number, reservationId: number): Promise<Reservation> => {
  const user = await UserRepository.findById(userId);

  if(!user) throw new NotFoundError("User doesn't exist");
  
  if(!user.actual_state) throw new BusinessError("User is deactivate");

  const reservation = await ReservationRepository.findById(reservationId)

  if(!reservation) throw new NotFoundError("Reservation doesn't exist");
  
  if (user.role == USER_ROLE_ID ) throw new UnauthorizedError("User doesn't have those permissions");

  if ((user.role == GUEST_ROLE_ID || user.role == HOSTGUEST_ROLE_ID) && reservation.user_id != userId) throw new UnauthorizedError("User doesn't have those permissions");

  const lodging = await LodgingRepository.findById(reservation.lodging_id)

  if ((user.role == HOSTGUEST_ROLE_ID || user.role == HOSTGUEST_ROLE_ID) && lodging.user_id != userId) throw new UnauthorizedError("User doesn't have those permissions");

  return reservation;
}

export const listReservationsByUser = async (userId:number, days?: number, page?: number): Promise<Page<Reservation>> => {
  const user = await UserRepository.findById(userId);

  if(!user) throw new NotFoundError("User doesn't exist");
  
  if(!user.actual_state) throw new BusinessError("User is deactivate");

  let limit_date = null;

  if(days) {
    limit_date = new Date;
    limit_date.setHours(-5,0,0,0);
    limit_date.setDate(limit_date.getDate() - days);
  }
  
  return await ReservationRepository.listReservationsByUser(userId, limit_date, page);
}

export const listReservationsByLodging = async (userId: number, lodgingId: number, days?: number, page?: number): Promise<Page<Reservation>> => {
  const user = await UserRepository.findById(userId);

  if(!user) throw new NotFoundError("User doesn't exist");
  
  if(!user.actual_state) throw new BusinessError("User is deactivate");

  const lodging = await LodgingRepository.findById(lodgingId);

  if(!lodging) throw new NotFoundError("Lodging doesn't exist");
  
  if(!lodging.actual_state) throw new BusinessError("Lodging is deactivate");

  if (user.role == GUEST_ROLE_ID || user.role == USER_ROLE_ID) throw new UnauthorizedError("User doesn't have those permissions");

  if (user.role != ADMIN_ROLE_ID && lodging.user_id != userId) throw new UnauthorizedError("User doesn't have those permissions");
  
  let limit_date = null;

  if(days) {
    limit_date = new Date;
    limit_date.setDate(limit_date.getDate() - days);
  }
  
  return await ReservationRepository.listReservationsByLodging(lodgingId, limit_date, page);
}

export const changeTodayReservationsStates = async () => {
  const today = new Date();
  today.setHours(0,0,0,0);

  const endReservations = await ReservationRepository.todayFinalizeReservations(today);
  const startReservations = await ReservationRepository.todayStartReservations(today);

  await endReservations.forEach(element => {
    ReservationRepository.changeReservationState(element.id, 2)
  });

  startReservations.forEach(async(element) => {
    await ReservationRepository.changeReservationState(element.id, 2)
  });

  endReservations.forEach(async(element) => {
    await ReservationRepository.changeReservationState(element.id, 3)
  });
}
