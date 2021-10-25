import { Model } from 'objection';

export default class Service extends Model {
    static get tableName() {
        return 'services';
    }
}