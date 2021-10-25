import { Model } from 'objection';
import StudyLevel from './studyLevel';
import CivilStatus from './CivilStatus';
import Rol from './Rol';

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
            Study_level: {
                relation: Model.HasOneRelation,
                modelClass: StudyLevel,
                join: {
                    from: 'users.study_level',
                    to: 'study_level.id'
                }
            },
            rol: {
                relation: Model.HasOneRelation,
                modelClass: Rol,
                join: {
                    from: 'users.rol',
                    to: 'rol.id'
                }
            }
        }
    }
}