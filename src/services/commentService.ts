import Comment from "../models/DAO/comment";
import * as LodgingRepository from "../repositories/lodgingRepository";
import * as UserRepository from '../repositories/userRepository';
import * as CommentRepository from '../repositories/commentRepository'
import * as ReservationRepository from '../repositories/reservationRepository'
import { BusinessError, NotFoundError, UnauthorizedError } from "../utils/ErrorHandlerMiddleware";
import { Page } from "objection";
import { ADMIN_ROLE_ID, GUEST_ROLE_ID, HOSTGUEST_ROLE_ID, HOST_ROLE_ID, USER_ROLE_ID } from '../utils/enums/rolesEnum';
import CommentsFilters from "../models/requests/listCommentsLodgingFilters";

export const createComment = async (userId: number, lodgingId: number, comment: Comment) => {
  const user = await UserRepository.findById(userId);

  if(!user) throw new NotFoundError("User doesn't exist");
  
  if(!user.actual_state) throw new BusinessError("User is deactivate");

  if (user.role == USER_ROLE_ID || user.role == HOST_ROLE_ID) throw new UnauthorizedError("User doesn't have those permissions");

  const lodging = await LodgingRepository.findById(lodgingId);

  if(!lodging) throw new NotFoundError("Lodging doesn't exist");
  
  if(!lodging.actual_state) throw new BusinessError("Lodging is deactivate");

  comment.user_id = userId;
  comment.lodging_id = lodgingId;

  await CommentRepository.create(comment);

  const reviews = await CommentRepository.getAllReviews(lodgingId);

  let score = 0;
  reviews.forEach(element => {
    score += element.quality;
    score += element.cleaning;
    score += element.ubication;
    score += element.veracity;
  });

  score = score/(reviews.length*4);

  await LodgingRepository.recalculateScore(lodgingId, score);
}

export const editComment = async (userId: number, lodgingId: number, commentId: number, description: string) => {
  const user = await UserRepository.findById(userId);

  if(!user) throw new NotFoundError("User doesn't exist");
  
  if(!user.actual_state) throw new BusinessError("User is deactivate");

  if (user.role == USER_ROLE_ID || user.role == HOST_ROLE_ID) throw new UnauthorizedError("User doesn't have those permissions");

  const lodging = await LodgingRepository.findById(lodgingId);

  if(!lodging) throw new NotFoundError("Lodging doesn't exist");
  
  if(!lodging.actual_state) throw new BusinessError("Lodging is deactivate");

  const comment = await CommentRepository.findById(commentId);

  if(!comment) throw new NotFoundError("Comment doesn't exist");

  if(comment.user_id != userId) throw new UnauthorizedError("User doesn't have those permissions");

  await CommentRepository.editComment(commentId, description);
}

export const deleteComment = async (userId: number, lodgingId: number, commentId: number) => {
  const user = await UserRepository.findById(userId);

  if(!user) throw new NotFoundError("User doesn't exist");
  
  if(!user.actual_state) throw new BusinessError("User is deactivate");

  if (user.role == USER_ROLE_ID || user.role == HOST_ROLE_ID) throw new UnauthorizedError("User doesn't have those permissions");

  const lodging = await LodgingRepository.findById(lodgingId);

  if(!lodging) throw new NotFoundError("Lodging doesn't exist");
  
  if(!lodging.actual_state) throw new BusinessError("Lodging is deactivate");

  const comment = await CommentRepository.findById(commentId);

  if(!comment) throw new NotFoundError("Comment doesn't exist");

  if(comment.user_id != userId) throw new UnauthorizedError("User doesn't have those permissions");

  await CommentRepository.deleteComment(commentId);

  const reviews = await CommentRepository.getAllReviews(lodgingId);

  let score = 0;
  reviews.forEach(element => {
    score += element.quality;
    score += element.cleaning;
    score += element.ubication;
    score += element.veracity;
  });

  score = score/(reviews.length*4);

  await LodgingRepository.recalculateScore(lodgingId, score);
}

export const listCommentsByLodging = async (lodgingId: number, filters: CommentsFilters, page?: number): Promise<Page<Comment>>=> {
  return await CommentRepository.listCommentsByLodging(lodgingId, filters, page);
}