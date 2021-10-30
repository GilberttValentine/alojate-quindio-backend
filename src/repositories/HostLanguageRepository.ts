import HostLanguage from '../models/DAO/hostLanguage';
import { HostLanguageShape } from '../models/DAO/hostLanguage';

export const createHostLanguage = async (hostlanguage: HostLanguageShape) => await HostLanguage.query().insert(hostlanguage)