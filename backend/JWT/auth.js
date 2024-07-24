import express from 'express';

const app = express();

app.use(express.json())

import { authenticate } from './helpers/authenticate.js';
import { authorize } from './helpers/authorize.js';

app.post('/app/login', [authenticate], (req, res) => {
    res.sendStatus(204)
})

app.post('/app/users', [authorize], (req, res) => {
    res.status(200).json({data: 'kkk'})
})

app.listen(3000, () => {
    console.log(`Server started on 3000 port`)
})