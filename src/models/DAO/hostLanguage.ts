import { Model, ModelObject } from 'objection';
import Language from './language';
import User from './user';
export default class HostLanguage extends Model {

    user_id!: number;
    language_id!: number;

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
export type HostLanguageShape = ModelObject<HostLanguage>;