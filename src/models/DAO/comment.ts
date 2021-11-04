import { Model, ModelObject } from 'objection';
import Lodging from './lodging';
import User from './user';

export default class Comment extends Model {
    id!: number;
    user_id!: number;
    lodging_id!: number;
    quality!: number;
    veracity!: number;
    cleaning!: number;
    ubication!: number;
    description!: string;

    static get tableName() {
        return 'comments';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'comments.user_id',
                    to: 'users.id'
                }
            },
            lodging: {
                relation: Model.HasOneRelation,
                modelClass: Lodging,
                join: {
                    from: 'comments.lodging_id',
                    to: 'lodgings.id'
                }
            },
        }
    }
}
export type CommentShape = ModelObject<Comment>;