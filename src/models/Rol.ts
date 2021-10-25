import { Model } from 'objection';

export default class Rol extends Model {
    static get tableName() {
        return 'rol';
    }
}