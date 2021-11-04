import { Model, ModelObject } from 'objection';
import User from './user';
import Municipality from './municipality';
import TypeLodging from './typeLodging';

export default class Lodging extends Model {
    id!: number;
    name!: string;
    user_id!: number;
    municipality_id!: number;
    type_id!: number;
    persons_amount!: number;
    accesibility!: string;
    direction!: string;
    room_quantity!: number;
    bed_quantity!: number;
    bathroom_quantity!: number;
    description!: string;
    actual_state!: boolean;
    night_value!: number;
    qualification!: number;
    services!: Array<string>;

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
            },
            municipality: {
                relation: Model.HasOneRelation,
                modelClass: Municipality,
                join: {
                    from: 'lodgings.municipality_id',
                    to: 'municipalities.id'
                }
            },
            type: {
                relation: Model.HasOneRelation,
                modelClass: TypeLodging,
                join: {
                    from: 'lodgings.type_id',
                    to: 'types_lodging.id'
                }
            }
        }
    }
}
export type LodgingShape = ModelObject<Lodging>;