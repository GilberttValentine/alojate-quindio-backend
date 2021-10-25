import { Model } from 'objection';

export default class CivilStatus extends Model {
    static get tableName() {
        return 'civil_status';
    }
}