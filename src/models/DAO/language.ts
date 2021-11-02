import { Model } from 'objection';

export default class Language extends Model {

    id!: number;
    language_name!: number;
    
    static get tableName() {
        return 'languages';
    }
}