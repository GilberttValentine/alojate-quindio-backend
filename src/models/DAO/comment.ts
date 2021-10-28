import { Model } from 'objection';
import Lodging from './lodging';
import User from './user';

export default class Comment extends Model {
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