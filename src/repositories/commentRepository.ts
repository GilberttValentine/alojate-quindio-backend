import { Page } from "objection";
import Comment from "../models/DAO/comment";
import CommentsFilters from "../models/requests/listCommentsLodgingFilters";

export const create = (comment: Comment) => Comment.query().insert(comment);

export const getAllReviews = (lodgingId: number): Promise<Comment[]> => {
  return Comment.query().column('quality','veracity', 'cleaning', 'ubication').where('lodging_id', lodgingId)
}

export const findById = (id: number): Promise<Comment> => {
  return Comment.query().findById(id);
}

export const editComment = (id: number, description: string) => {
  return Comment.query().patch({ description: description }).findById(id)
}

export const deleteComment = (id: number) => {
  return Comment.query().deleteById(id)
}

export const listCommentsByLodging = (lodgingId: number, filters: CommentsFilters, page?: number): Promise<Page<Comment>> => {
  let comments = Comment.query().where("lodging_id", lodgingId);

  if(filters.user_id) comments = comments.where("user_id", filters.user_id);
  
  if(filters.veracity_under) comments = comments.whereComposite("veracity", "<=", filters.veracity_under);
  
  if(filters.quality_under) comments = comments.whereComposite("quality", "<=", filters.quality_under);
  
  if(filters.ubication_under) comments = comments.whereComposite("ubication", "<=", filters.ubication_under);
  
  if(filters.cleaning_under) comments = comments.whereComposite("cleaning", "<=", filters.cleaning_under);
  
  return comments.page(page?page:0, 10);
}