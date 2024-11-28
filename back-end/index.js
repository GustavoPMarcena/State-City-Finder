import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './src/routes/mapRoute.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/map/', router);

app.listen(port, ()=> {
    console.log("Server rodando na porta ");
});
