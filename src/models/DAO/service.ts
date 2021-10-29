import { Model } from 'objection';

export default class Service extends Model {
    id!: number;
    name!: string;
    
    static get tableName() {
        return 'services';
    }
}