import { Page } from "objection";
import Comment from "../models/DAO/comment";
import CommentsFilters from "../models/requests/listCommentsLodgingFilters";

export const create = async(comment: Comment) => await Comment.query().insert(comment);

export const getAllReviews = async(lodgingId: number): Promise<Comment[]> => {
  return await Comment.query().column('quality','veracity', 'cleaning', 'ubication').where('lodging_id', lodgingId)
}

export const findById = async(id: number): Promise<Comment> => {
  return await Comment.query().findById(id);
}

export const editComment = async(id: number, description: string) => {
  await Comment.query().patch({ description: description }).findById(id)
}

export const deleteComment = async(id: number) =>  await Comment.query().deleteById(id)

export const listCommentsByLodging = async(lodgingId: number, filters: CommentsFilters, page?: number): Promise<Page<Comment>> => {
  let comments = Comment.query().where("lodging_id", lodgingId);

  if(filters.user_id) comments = comments.where("user_id", filters.user_id);
  
  if(filters.veracity_under) comments = comments.whereComposite("veracity", "<=", filters.veracity_under);
  
  if(filters.quality_under) comments = comments.whereComposite("quality", "<=", filters.quality_under);
  
  if(filters.ubication_under) comments = comments.whereComposite("ubication", "<=", filters.ubication_under);
  
  if(filters.cleaning_under) comments = comments.whereComposite("cleaning", "<=", filters.cleaning_under);
  
  return await comments.page(page?page:0, 10);
}