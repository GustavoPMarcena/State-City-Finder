import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

const app = express();
const port = 3000;
const { Client } = pg;
const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB
});

app.get('/svg', (req, res)=> {
    res.send('Hello');
});

app.listen(port, ()=> {
    console.log("Server rodando na porta ");
});
