import { Request, Response, NextFunction } from 'express';
import * as CommentService from "../services/commentService";
import { logger } from '../utils/logger';

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body } = req;
    const response = await CommentService.createComment(Number(params.userId), Number(params.lodgingId), body);

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in CommentController.createComment: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error)
  }
}

export const editComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body } = req;
    const response = await CommentService.editComment(Number(params.userId), Number(params.lodgingId),Number(params.commentId), body.description);

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in CommentController.editComment: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error)
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const response = await CommentService.deleteComment(Number(params.userId), Number(params.lodgingId),Number(params.commentId));

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in CommentController.deleteComment: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error)
  }
}

export const listCommentsByLodging = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body, query } = req;
    const response = await CommentService.listCommentsByLodging(Number(params.lodgingId), body, Number(query.page));

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;

    logger.error(`Error in CommentController.listCommentsByLodging: ${error.message}`);

    res.status(status).send({ 'status': error.status, 'message': error.message }).end();
    
    return next(error)
  }
}