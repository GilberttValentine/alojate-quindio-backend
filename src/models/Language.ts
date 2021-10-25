import { Model } from 'objection';

export default class Language extends Model {
    static get tableName() {
        return 'languages';
    }
}