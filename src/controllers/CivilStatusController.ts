import * as civilStatusService from '../services/CivilStatusService'

export const getAllCivilStatus = async (req: any, res: any, next: any) => {
    try {
        const civilStatus = await civilStatusService.getAllCivilStatus()
        res.send({ message: civilStatus })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}