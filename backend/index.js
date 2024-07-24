import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import router from './router/index.js';
import errorMiddlewares from './middlewares/error-middlewares.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
    credentials: true,
    origin: process.env.CLIENT_URL
}
))
app.use('/api', router);
app.use(errorMiddlewares)
// app.use(fileUpload({
//     createParentPath: true
// }));

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());


async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log('Server started'))
    } catch(e){
        console.log(e)
    }
}

start()
