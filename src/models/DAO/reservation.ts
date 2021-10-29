import { Model } from 'objection';
import Lodging from './lodging';
import User from './user';

export default class Reservation extends Model {
    static get tableName() {
        return 'reservations';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'reservations.user_id',
                    to: 'users.id'
                }
            },
            lodging: {
                relation: Model.HasOneRelation,
                modelClass: Lodging,
                join: {
                    from: 'reservations.lodging_id',
                    to: 'lodgings.id'
                }
            },

        }
    }
}