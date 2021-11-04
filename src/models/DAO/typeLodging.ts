import { Model, ModelObject } from 'objection';

export default class TypeLodging extends Model {
    id!: number;
    name!: string;
    url_picture!: string;

    static get tableName() {
        return 'types_lodging';
    }
}

export type TypeLodgingShape = ModelObject<TypeLodging>;