import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes';
import cors from 'cors';

const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Permitir cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir el uso de cookies y otros encabezados de autenticación
};
dotenv.config();
const app = express()
.use(express.json())
.use(express.urlencoded({ extended:true }));
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use('/api', authRoutes)

app.listen(PORT, () =>{
    console.log('Conectado al puerto', PORT);
}).on('error', (err:any)=>{
    throw new Error(err.message);
});