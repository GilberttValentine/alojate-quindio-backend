import { Model } from 'objection';

export default class Municipality extends Model {
  id!: number;
  name!: string;
  url_picture!: string;

  static get tableName() {
    return 'municipalities';
  }
}