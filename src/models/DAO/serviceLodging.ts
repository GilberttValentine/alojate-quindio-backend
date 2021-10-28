import { Model } from 'objection';
import Lodging from './lodging';
import Service from './service';

export default class ServiceLodging extends Model {
    static get tableName() {
        return 'services_lodgings';
    }

    static get relationMappings() {
        return {
            service: {
                relation: Model.HasOneRelation,
                modelClass: Service,
                join: {
                    from: 'services_lodgings.service_id',
                    to: 'services.id'
                }
            },
            lodging: {
                relation: Model.HasOneRelation,
                modelClass: Lodging,
                join: {
                    from: 'services_lodgings.lodging_id',
                    to: 'lodgings.id'
                }
            },

        }
    }
}