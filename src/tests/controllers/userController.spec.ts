import { clearAll } from '../DBHelper';
import { app, server } from '../../index'
import supertest from 'supertest'
import User from '../../models/DAO/user'
import HostLanguage from '../../models/DAO/hostLanguage'

const api = supertest(app)


describe('flow from user api', () => {
    beforeEach(async () => { await clearAll() });

    test('create user test', async () => {

        const userToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }

        await api.post(`/api/users`)
            .send(userToCreate)
            .expect(200);
    })

    test('create user and email is wrong test', async () => {

        const userToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }

        await api.post(`/api/users`)
            .send(userToCreate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, { "status": 412, "message": "Email is not valid." })
    })

    test('create user and already exist test', async () => {

        const userToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }

        await User.query().insert(userToCreate)

        await api.post(`/api/users`)
            .send(userToCreate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, { "status": 412, "message": "User already exist" })
    })

    test('update user and user not founded test', async () => {
        const userToUpdate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }

        await api.put(`/api/users/1`)
            .send(userToUpdate)
            .expect(404, { status: 404, message: 'User not founded' })
    })

    test('update user and user is admin test', async () => {

        const userToUpdate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 1
        }

        const user =await User.query().insert(userToUpdate)

        await api.put(`/api/users/${user.id}`)
            .send(userToUpdate)
            .expect(403, { status: 403, message: 'Unreachable request' })
    })
    test('activate user test', async () => {

        const userToUpdate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe",
            password: "12345",
            url_picture: "",
            actual_state: false,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }

        const user =await User.query().insert(userToUpdate)

        await api.patch(`/api/users/${user.id}/activate`)
            .send(userToUpdate)
            .expect(200)
    })

    test('activate user and user is already activated test', async () => {

        const userToUpdate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }

        const user =await User.query().insert(userToUpdate)

        await api.patch(`/api/users/${user.id}/activate`)
            .send(userToUpdate)
            .expect(412,{ status: 412, message: 'User is already active' })
    })

    test('deactivate user test', async () => {

        const userToUpdate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }

        const user =await User.query().insert(userToUpdate)

        await api.patch(`/api/users/${user.id}/deactivate`)
            .send(userToUpdate)
            .expect(200)
    })

    test('deactivate user but user is deactivated test', async () => {

        const userToUpdate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe",
            password: "12345",
            url_picture: "",
            actual_state: false,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }

        const user =await User.query().insert(userToUpdate)

        await api.patch(`/api/users/${user.id}/deactivate`)
            .send(userToUpdate)
            .expect(412,{ status: 412, message: 'User is already deactivated' })
    })
    afterAll(() => { server.close() })
})

describe('flow from host api', () => {
    beforeEach(async () => { await clearAll(); });

    test('create host test', async () => {

        const hostToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }
        const host = await User.query().insert(hostToCreate)
        const languages = { languagesId: [1, 5, 2, 5, 2, 2] }

        await api.patch(`/api/users/${host.id}/hosts`)
            .send(languages)
            .expect(200)


    })

    test('create host and user not founded test', async () => {

        const languages = { languagesId: [1, 5, 2, 5, 2, 2] }

        await api.patch(`/api/users/1/hosts`)
            .send(languages)
            .expect(404, { "status": 404, "message": "User not founded" })
    })

    test('create host and user is admin test', async () => {

        const hostToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 1
        }
        const host = await User.query().insert(hostToCreate)
        const languages = { languagesId: [1, 5, 2, 5, 2, 2] }

        await api.patch(`/api/users/${host.id}/hosts`)
            .send(languages)
            .expect(403, { "status": 403, "message": "Unreachable request" })
    })

    test('create host and user already exist as host test', async () => {

        const hostToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 2
        }
        const host = await User.query().insert(hostToCreate)
        const languages = { languagesId: [1, 5, 2, 5, 2, 2] }

        await api.patch(`/api/users/${host.id}/hosts`)
            .send(languages)
            .expect(412, { "status": 412, "message": "User already exist as host" })
    })

    test('create host and user already exist as hostguest test', async () => {

        const hostToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 4
        }
        const host = await User.query().insert(hostToCreate)
        const languages = { languagesId: [1, 5, 2, 5, 2, 2] }

        await api.patch(`/api/users/${host.id}/hosts`)
            .send(languages)
            .expect(412, { "status": 412, "message": "User already exist as host" })
    })

    test('create host and not languages founded test', async () => {

        const hostToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }
        const host = await User.query().insert(hostToCreate)

        const languages = { languagesId: [5, 5,] }

        await api.patch(`/api/users/${host.id}/hosts`)
            .send(languages)
            .expect(412, { "status": 412, "message": "Languages not founded" })
    })

    test('update host and user not founded test', async () => {

        const hostToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 1
        }
        const host = await User.query().insert(hostToCreate)
        const languages = { languagesId: [1, 5, 2, 5, 2, 2] }


        await api.put(`/api/users/1/hosts`)
            .send(languages)
            .expect(404, { "status": 404, "message": "User not founded" })
    })

    test('update host and user is admin test', async () => {
        const hostToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 1
        }
        const host = await User.query().insert(hostToCreate)

        const languages = { languagesId: [1, 5, 2, 5, 2, 2] }

        await api.put(`/api/users/${host.id}/hosts`)
            .send(languages)
            .expect(403, { "status": 403, "message": "Unreachable request" })
    })

    test('update host and user is not a host test', async () => {
        const hostToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 3
        }
        const host = await User.query().insert(hostToCreate)

        const languages = { languagesId: [1, 5, 2, 5, 2, 2] }

        await api.put(`/api/users/${host.id}/hosts`)
            .send(languages)
            .expect(412, { "status": 412, "message": "User is not a host" })
    })

    test('update host and languages not founded test', async () => {
        const hostToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 2
        }
        const host = await User.query().insert(hostToCreate)

        const languages = { languagesId: [1, 2, 3] }

        languages.languagesId.forEach(async it => {
            const hostLanguage = { user_id: host.id, language_id: it }
            await HostLanguage.query().insert(hostLanguage)
        })

        await api.put(`/api/users/${host.id}/hosts`)
            .send(languages)
            .expect(412, { "status": 412, "message": "Languages not founded" })
    })

    afterEach(async () => { await HostLanguage.query().delete() });
    afterAll(() => { server.close() })
})

describe('flow from guest api', () => {
    beforeEach(async () => { await clearAll(); });

    test('create guest test', async () => {

        const guestToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }
        const guest = await User.query().insert(guestToCreate)

        const guestBody = {
            stratum: 6,
            studyLevelId: 1,
            civilStatus: 1
        }

        await api.patch(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(200)
    })

    test('create guest and user not founded test', async () => {

        const guestBody = {
            stratum: 6,
            studyLevelId: 1,
            civilStatus: 1
        }
        await api.patch(`/api/users/1/guests`)
            .send(guestBody)
            .expect(404, { "status": 404, "message": "User not founded" })
    })

    test('create guest and user is admin test', async () => {

        const guestToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 1
        }
        const guest = await User.query().insert(guestToCreate)

        const guestBody = {
            stratum: 6,
            studyLevelId: 1,
            civilStatus: 1
        }

        await api.patch(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(403, { "status": 403, "message": "Unreachable request" })
    })

    test('create guest but user is already guest test', async () => {

        const guestToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 3
        }
        const guest = await User.query().insert(guestToCreate)

        const guestBody = {
            stratum: 6,
            studyLevelId: 1,
            civilStatus: 1
        }

        await api.patch(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(412, { "status": 412, "message": "User already exist as guest" })
    })

    test('create guest but user is already hostguest test', async () => {

        const guestToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 4
        }
        const guest = await User.query().insert(guestToCreate)

        const guestBody = {
            stratum: 6,
            studyLevelId: 1,
            civilStatus: 1
        }

        await api.patch(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(412, { "status": 412, "message": "User already exist as guest" })
    })

    test('create guest but user and stratum is not vaid test', async () => {

        const guestToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }
        const guest = await User.query().insert(guestToCreate)

        const guestBody = {
            stratum: 8,
            studyLevelId: 1,
            civilStatus: 1
        }

        await api.patch(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(412, { "status": 412, "message": "Stratum is not valid" })
    })

    test('create guest but user and civil status not founded test', async () => {

        const guestToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }
        const guest = await User.query().insert(guestToCreate)

        const guestBody = {
            stratum: 8,
            studyLevelId: 1,
            civilStatus: 100
        }

        await api.patch(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(404, { "status": 404, "message": "Civil status not founded" })
    })

    test('create guest but user and study level not founded test', async () => {

        const guestToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 5
        }
        const guest = await User.query().insert(guestToCreate)

        const guestBody = {
            stratum: 8,
            studyLevelId: 100,
            civilStatus: 1
        }

        await api.patch(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(404, { "status": 404, "message": "Study level not founded" })
    })

    test('update guest but user and user is not founded test', async () => {

        const guestBody = {
            stratum: 8,
            studyLevelId: 1,
            civilStatus: 1
        }

        await api.put(`/api/users/1/guests`)
            .send(guestBody)
            .expect(404, { "status": 404, "message": "User not founded" })
    })

    test('update guest but user and user is admin test', async () => {
        const guestToUpdate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 1
        }
        const guest = await User.query().insert(guestToUpdate)

        const guestBody = {
            stratum: 8,
            studyLevelId: 1,
            civilStatus: 1
        }

        await api.put(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(403, { "status": 403, "message": "Unreachable request" })
    })

    test('update guest but user and user is not a guest test', async () => {
        const guestToUpdate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 2
        }
        const guest = await User.query().insert(guestToUpdate)

        const guestBody = {
            stratum: 8,
            studyLevelId: 1,
            civilStatus: 1
        }

        await api.put(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(412, { "status": 412, "message": "User is not a guest" })
    })

    test('update guest but user and civil status not founded test', async () => {

        const guestToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 3
        }
        const guest = await User.query().insert(guestToCreate)

        const guestBody = {
            stratum: 8,
            studyLevelId: 1,
            civilStatus: 100
        }

        await api.put(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(404, { "status": 404, "message": "Civil status not founded" })
    })

    test('update guest but user and study level not founded test', async () => {

        const guestToCreate = {
            first_name: "felipe",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            direction: "",
            email: "felipe@hotmail.com",
            password: "12345",
            url_picture: "",
            actual_state: true,
            stratum: 1,
            civil_status_id: 2,
            study_level_id: 2,
            role_id: 4
        }
        const guest = await User.query().insert(guestToCreate)

        const guestBody = {
            stratum: 8,
            studyLevelId: 100,
            civilStatus: 1
        }

        await api.put(`/api/users/${guest.id}/guests`)
            .send(guestBody)
            .expect(404, { "status": 404, "message": "Study level not founded" })
    })

    afterAll(() => { server.close() })
})