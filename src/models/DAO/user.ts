import { Model, ModelObject } from 'objection';
import StudyLevel from './studyLevel';
import CivilStatus from './civilStatus';
import Role from './role';

export default class User extends Model {
    id!:number;
    first_name!: string;       
    second_name!: string;     
    first_lastname!: string;  
    second_lastname!: string;   
    direction!: string;    
    email!: string;
    password!: string;
    url_picture!: string;        
    actual_state!: boolean;        
    stratum!: number;
    civil_status_id!: number;
    study_level_id!: number;
    role_id!: number;

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
                    to: 'study_levels.id'
                }
            },
            role: {
                relation: Model.HasOneRelation,
                modelClass: Role,
                join: {
                    from: 'users.role',
                    to: 'roles.id'
                }
            }
        }
    }
}
export type UserShape = ModelObject<User>;