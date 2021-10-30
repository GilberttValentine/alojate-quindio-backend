import { UserShape } from '../models/DAO/user';
import { HostLanguageShape } from '../models/DAO/hostLanguage';
import Language from '../models/DAO/language';

import * as UserRepository from '../repositories/userRepository';
import * as CivinStatusRepository from '../repositories/civilStatusRepository';
import * as StudyLevelRepository from '../repositories/studyLevelRepository';
import * as LanguageRepository from '../repositories/languageRepository';
import * as HostLanguageRepository from '../repositories/HostLanguageRepository';

import { BusinessError, NotFoundError } from "../utils/ErrorHandlerMiddleware";
import { HOST_ROLE_ID, GUEST_ROLE_ID, HOSTGUEST_ROLE_ID, USER_ID, DEFAULT_CIVIL_STATUS_ID, DEFAULT_STUDY_LEVEL_ID } from '../utils/userUtils/modelsUtils/userConstants'
import { deleteDuplicatedElementsOfNumericArray } from '../utils/userUtils/serviceUtils/createHostFunctions'

export const createUser = async (user: UserShape) => {

    const userToFind = await UserRepository.findByMail(user.email);

    if (userToFind) throw new BusinessError('User already exist')

    user.stratum = 0
    user.civil_status_id = DEFAULT_CIVIL_STATUS_ID
    user.study_level_id = DEFAULT_STUDY_LEVEL_ID
    user.role_id = USER_ID
    await UserRepository.createUser(user)
}

export const createHost = async (id: number, languagesIdList: number[]) => {

    const userToFind: UserShape = await UserRepository.findById(id);

    if (!userToFind) throw new NotFoundError('User not founded')

    if (userToFind.role_id === HOST_ROLE_ID || userToFind.role_id === HOSTGUEST_ROLE_ID) throw new BusinessError('User already exist as host')

    languagesIdList = deleteDuplicatedElementsOfNumericArray(languagesIdList)

    const validLanguagesList = (await Promise.all(languagesIdList
        .map(async it => await LanguageRepository.findLanguageById(it))))
        .filter(it => it)

    if (validLanguagesList.length === 0) throw new BusinessError('Languages not founded')

    userToFind.role_id = (userToFind.role_id === GUEST_ROLE_ID) ? HOSTGUEST_ROLE_ID : HOST_ROLE_ID

    await UserRepository.createHost(id, userToFind)

    validLanguagesList.forEach(async (it: Language) => {
        const hostLanguage: HostLanguageShape = { user_id: userToFind.id, language_id: it.id }
        await HostLanguageRepository.createHostLanguage(hostLanguage)
    })
}

export const createGuest = async (id: number, stratum: number, studyLevelId: number, civilStatusId: number) => {

    const userToFind = await UserRepository.findById(id);

    if (!userToFind) throw new NotFoundError('User not founded')

    const civilStatusToFind = await CivinStatusRepository.findById(civilStatusId);

    if (!civilStatusToFind) throw new NotFoundError('Civil status not founded')

    const studyLevelToFind = await StudyLevelRepository.findById(studyLevelId)

    if (!studyLevelToFind) throw new NotFoundError('Study level not founded')

    if (userToFind.role_id === GUEST_ROLE_ID || userToFind.role_id === HOSTGUEST_ROLE_ID) throw new BusinessError('User already exist as guest')

    if (stratum < 0 || stratum > 7) throw new BusinessError('Stratum is invalid')

    userToFind.role_id = (userToFind.role_id === HOST_ROLE_ID) ? HOSTGUEST_ROLE_ID : GUEST_ROLE_ID

    const updatedGuest: UserShape = {
        ...userToFind,
        stratum: stratum,
        study_level_id: studyLevelId,
        civil_status_id: civilStatusId
    }

    await UserRepository.createGuest(id, updatedGuest)
}
