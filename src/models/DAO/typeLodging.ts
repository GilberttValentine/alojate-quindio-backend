import { Model } from 'objection';

export default class TypeLodging extends Model {
    static get tableName() {
        return 'types_lodging';
    }
}