import HostLanguage from '../models/DAO/hostLanguage';
import { HostLanguageShape } from '../models/DAO/hostLanguage';

export const createHostLanguage = async (hostlanguage: HostLanguageShape) => await HostLanguage.query().insert(hostlanguage)

export const getHostLanguageByHostIdAndLanguageId = async (hostId: number, languageId: number) => await HostLanguage.query().where('user_id', hostId).where('language_id', languageId).first()
