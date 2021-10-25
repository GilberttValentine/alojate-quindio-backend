import { returnHello } from '../services/HelloService'

export function sayHello(req: any, res: any, next: any) {
    const body = req.body;
    try {
        console.log(returnHello())
        res.send({ message: returnHello() })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}