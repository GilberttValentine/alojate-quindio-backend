import express from 'express';
import cors from 'cors';
import { database } from './config/database';
import { router } from './controllers/routes';

database();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', router);


app.listen(port, () => {
    console.log(`Server on port ${port}`);
})