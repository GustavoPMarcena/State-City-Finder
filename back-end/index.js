import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './src/routes/mapRoute.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;



const corsOptions = {
    origin: 'http://localhost:3000', // Permitir apenas a origem do front-end
    credentials: true, // Permitir envio de cookies/credenciais
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/map/', router);

app.listen(port, ()=> {
    console.log("Server rodando na porta ");
});
