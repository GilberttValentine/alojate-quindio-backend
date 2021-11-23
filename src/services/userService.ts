import { UserShape } from '../models/DAO/user';
import { HostLanguageShape } from '../models/DAO/hostLanguage';
import Language from '../models/DAO/language';

import * as UserRepository from '../repositories/userRepository';
import * as CivilStatusRepository from '../repositories/civilStatusRepository';
import * as StudyLevelRepository from '../repositories/studyLevelRepository';
import * as LanguageRepository from '../repositories/languageRepository';
import * as HostLanguageRepository from '../repositories/HostLanguageRepository';

import { BusinessError, NotFoundError, UnauthorizedError } from "../utils/ErrorHandlerMiddleware";
import { HOST_ROLE_ID, GUEST_ROLE_ID, HOSTGUEST_ROLE_ID, ADMIN_ROLE_ID, USER_ID, DEFAULT_CIVIL_STATUS_ID, DEFAULT_STUDY_LEVEL_ID, DEFAULT_STRATUM } from '../utils/userUtils/modelsUtils/userConstants'
import { deleteDuplicatedElementsOfNumericArray } from '../utils/userUtils/serviceUtils/createHostFunctions'
import { hashSomePassowrd } from '../utils/security/securityUtils';

import * as EmailValidator from 'email-validator';


export const createUser = async (user: UserShape) => {
    const userToFind = await UserRepository.findByMail(user.email);

    if (userToFind) throw new BusinessError('User already exist')

    if (!EmailValidator.validate(user.email)) throw new BusinessError('Email is not valid.');

    user.password = await hashSomePassowrd(user.password)
    user.stratum = DEFAULT_STRATUM
    user.civil_status_id = DEFAULT_CIVIL_STATUS_ID
    user.study_level_id = DEFAULT_STUDY_LEVEL_ID
    user.role_id = USER_ID
    user.actual_state = true

    await UserRepository.createUser(user);
}

export const createHost = async (id: number, languagesIdList: number[]) => {

    const userToFind: UserShape = await UserRepository.findById(id);

    if (!userToFind) throw new NotFoundError('User not founded')

    if (userToFind.role_id === ADMIN_ROLE_ID) throw new UnauthorizedError('Unreachable request')

    if (userToFind.role_id === HOST_ROLE_ID || userToFind.role_id === HOSTGUEST_ROLE_ID) throw new BusinessError('User already exist as host')

    languagesIdList = deleteDuplicatedElementsOfNumericArray(languagesIdList)

    const validLanguagesList = (await Promise.all(languagesIdList
        .map(async it => await LanguageRepository.findLanguageById(it))))
        .filter(it => it)

    if (validLanguagesList.length === 0) throw new BusinessError('Languages not founded')

    await UserRepository.createHost(id, (userToFind.role_id === GUEST_ROLE_ID) ? HOSTGUEST_ROLE_ID : HOST_ROLE_ID)

    validLanguagesList.forEach(async (it: Language) => {
        const hostLanguage: HostLanguageShape = { user_id: userToFind.id, language_id: it.id }
        await HostLanguageRepository.createHostLanguage(hostLanguage)
    })
}

export const createGuest = async (id: number, stratum: number, studyLevelId: number, civilStatusId: number) => {

    const userToFind = await UserRepository.findById(id);

    if (!userToFind) throw new NotFoundError('User not founded')

    if (userToFind.role_id === ADMIN_ROLE_ID) throw new UnauthorizedError('Unreachable request')

    const civilStatusToFind = await CivilStatusRepository.findById(civilStatusId);

    if (!civilStatusToFind) throw new NotFoundError('Civil status not founded')

    const studyLevelToFind = await StudyLevelRepository.findById(studyLevelId)

    if (!studyLevelToFind) throw new NotFoundError('Study level not founded')

    if (userToFind.role_id === GUEST_ROLE_ID || userToFind.role_id === HOSTGUEST_ROLE_ID) throw new BusinessError('User already exist as guest')

    if (stratum < 0 || stratum >= 7) throw new BusinessError('Stratum is not valid')

    userToFind.role_id = (userToFind.role_id === HOST_ROLE_ID) ? HOSTGUEST_ROLE_ID : GUEST_ROLE_ID

    const updatedGuest: UserShape = {
        ...userToFind,
        stratum: stratum,
        study_level_id: studyLevelId,
        civil_status_id: civilStatusId,
        role_id: userToFind.role_id
    }

    await UserRepository.createGuest(id, updatedGuest)
}

export const updateUser = async (id: number, user: UserShape) => {

    const userToFind = await UserRepository.findById(id);

    if (!userToFind) throw new NotFoundError('User not founded')

    if (userToFind.role_id === ADMIN_ROLE_ID) throw new UnauthorizedError('Unreachable request')

    user = {
        ...user,
        stratum: userToFind.stratum,
        civil_status_id: userToFind.civil_status_id,
        study_level_id: userToFind.study_level_id
    }

    await UserRepository.updateUser(id, user)
}

export const updateHost = async (id: number, languagesIdList: number[]) => {

    const userToFind = await UserRepository.findById(id);

    if (!userToFind) throw new NotFoundError('User not founded')

    if (userToFind.role_id === ADMIN_ROLE_ID) throw new UnauthorizedError('Unreachable request')

    if (userToFind.role_id !== HOST_ROLE_ID && userToFind.role_id !== HOSTGUEST_ROLE_ID) throw new BusinessError('User is not a host')

    languagesIdList = deleteDuplicatedElementsOfNumericArray(languagesIdList)

    const validLanguagesList = (await Promise.all(languagesIdList
        .map(async it => {
            const language = await LanguageRepository.findLanguageById(it)
            if (language) {
                const hostLanguageProofment = await HostLanguageRepository.getHostLanguageByHostIdAndLanguageId(id, language.id)
                if (hostLanguageProofment) return null
                return it
            }
        }))).filter(it => it)

    if (validLanguagesList.length === 0) throw new BusinessError('Languages not founded')

    validLanguagesList.forEach(async it => {
        const hostLanguage: HostLanguageShape = { user_id: id, language_id: Number(it) }
        await HostLanguageRepository.createHostLanguage(hostLanguage)
    });
}

export const updateGuest = async (id: number, stratum: number, studyLevelId: number, civilStatusId: number) => {
    const userToFind = await UserRepository.findById(id);

    if (!userToFind) throw new NotFoundError('User not founded')

    if (userToFind.role_id === ADMIN_ROLE_ID) throw new UnauthorizedError('Unreachable request')

    if (userToFind.role_id !== GUEST_ROLE_ID && userToFind.role_id !== HOSTGUEST_ROLE_ID) throw new BusinessError('User is not a guest')

    const civilStatusToFind = await CivilStatusRepository.findById(civilStatusId);

    if (!civilStatusToFind) throw new NotFoundError('Civil status not founded')

    const studyLevelToFind = await StudyLevelRepository.findById(studyLevelId)

    if (!studyLevelToFind) throw new NotFoundError('Study level not founded')

    const user: UserShape = {
        ...userToFind,
        stratum: stratum,
        civil_status_id: civilStatusId,
        study_level_id: studyLevelId
    }

    await UserRepository.updateUser(id, user)
}

export const activateUser = async (id: number) => {

    const userToFind = await UserRepository.findById(id);

    if (!userToFind) throw new NotFoundError('User not founded')

    if (userToFind.role_id === ADMIN_ROLE_ID) throw new UnauthorizedError('Unreachable request')

    if (userToFind.actual_state === true) throw new BusinessError('User is already active')

    userToFind.actual_state = true

    await UserRepository.updateUser(id, userToFind)
}

export const deactivateUser = async (id: number) => {

    const userToFind = await UserRepository.findById(id);

    if (!userToFind) throw new NotFoundError('User not founded')

    if (userToFind.role_id === ADMIN_ROLE_ID) throw new UnauthorizedError('Unreachable request')

    if (userToFind.actual_state === false) throw new BusinessError('User is already deactivated')

    userToFind.actual_state = false

    await UserRepository.updateUser(id, userToFind)
}

export const findUserById = async (id: number): Promise<UserShape> => {
    const userToFind = await UserRepository.findUserById(id);

    if (!userToFind) throw new NotFoundError('User not founded');

    //if (userToFind.role_id === ADMIN_ROLE_ID) throw new UnauthorizedError('Unreachable request');

    return userToFind;
}

export const findAllUsers = async (page: number): Promise<object> => {

    const validPage = page || page >= 0 ? page : 0;

    return await UserRepository.findAllUsers(validPage)
}
