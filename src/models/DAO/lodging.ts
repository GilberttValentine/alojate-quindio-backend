import { Model } from 'objection';
import User from './user';

export default class Lodging extends Model {
    id!: number;
    name!: string;
    user_id!: number;
    persons_amount!: number;
    accesibility!: string;
    direction!: string;
    room_quantity!: number;
    bed_quantity!: number;
    bathroom_quantity!: number;
    description!: string;
    actual_state!: boolean;
    night_value!: number;
    
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