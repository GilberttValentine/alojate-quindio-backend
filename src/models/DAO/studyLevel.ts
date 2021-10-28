import { Model } from 'objection';

export default class StudyLevel extends Model {
    static get tableName() {
        return 'study_levels';
    }
}