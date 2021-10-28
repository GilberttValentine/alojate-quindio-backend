import { Model } from 'objection';
import StudyLevel from './studyLevel';
import CivilStatus from './civilStatus';
import Role from './role';

export default class User extends Model {

    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            civil_status: {
                relation: Model.HasOneRelation,
                modelClass: CivilStatus,
                join: {
                    from: 'users.civil_status',
                    to: 'civil_status.id'
                }
            },
            study_level: {
                relation: Model.HasOneRelation,
                modelClass: StudyLevel,
                join: {
                    from: 'users.study_level',
                    to: 'study_level.id'
                }
            },
            role: {
                relation: Model.HasOneRelation,
                modelClass: Role,
                join: {
                    from: 'users.role',
                    to: 'role.id'
                }
            }
        }
    }
}