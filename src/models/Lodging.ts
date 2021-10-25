import { Model } from 'objection';
import User from './User';

export default class Lodging extends Model {
    static get tableName() {
        return 'lodgings';
    }
    static get relationMappings() {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'lodgings.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}