import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql2.createConnection({
    host: 'localhost',
    user:'root',
    password:'McuR1097_0308',
    database:'login'
});

db.connect((err)=>{
    if(err){
        console.error('Error al conectar a la base de datos', err.message);
    }else{
        console.log('Conectado a la base de datos');
    }
});