import { Model } from 'objection';
import Lodging from './lodging';
import User from './user';

export default class Reservation extends Model {
    id!: number;
    user_id!: number;
    lodging_id!: number;
    start_date!: Date;
    end_date!: Date;
    night_value!: number;
    actual_state!: number;

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