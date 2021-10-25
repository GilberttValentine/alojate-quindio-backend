import { Model } from 'objection';
import Language from './Language';
import User from './User';

export default class HostLanguage extends Model {
    static get tableName() {
        return 'hosts_languages';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'hosts_languages.user_id',
                    to: 'users.id'
                }
            },
            language: {
                relation: Model.HasOneRelation,
                modelClass: Language,
                join: {
                    from: 'hosts_languages.language_id',
                    to: 'languages.id'
                }
            },

        }
    }
}