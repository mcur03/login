import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  { db }  from '../Config/db';
import { RowDataPacket } from 'mysql2';

export async function registerUser(req:Request, res:Response){
    const { email, username, pass} = req.body;

    try{
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(pass, saltRounds); 

        const query = 'INSERT INTO usuario( email, username, pass) VALUES(?, ?, ?)';
        const values = [ email, username, hashedPass];

        db.query(query, values, (err) => {
            if(err){
                console.error('Error al registrar: ', err.message);
                return res.status(500).json({Error: 'Error al registrarse' });
            }else{
                console.log('Usuario registrado');
                return res.status(201).json({
                    message: 'Usuario tegistrado',
                    username:username,
                    email:email
                });
            }
        })
    }catch(error){
        console.error('Error al encriptar la contraseña: ', error);
        return res.status(500).json({Error:'Error en el servidor'})
    }
};

export function login(req:Request, res:Response) {
    const { email, pass } = req.body;
    const token = generateToken(email);
    
    try{
        const query = 'SELECT * FROM usuario WHERE email = ?';

        db.query<RowDataPacket[]>(query, [email], async (err, result) => {
            if(err){
                console.error('Error en el servidor', err.message);
                return res.status(500).json({Error: 'error en el servidor'});
            }
            if(result.length > 0){
                try{
                    const user = result[0] as { pass: string };
                    const match = await bcrypt.compare(pass, user.pass);

                    if(match){
                        console.log('Usuaior autenticado');
                        return res.status(200).json({
                            message: 'Usuario autenticado',
                            token: token
                        });
                    }else{
                        console.error('Credenciales incorrectas');
                        return res.status(401).json({Error: 'Credenciales incorrectas'});
                    }
                    }catch(error){
                    console.error('Error al verificar la contraseña: ', error);
                    return res.status(500).json({Error: 'Error al verificar la contraseña'});
                }
            }else{
                console.error('Credenciales incorrectas');
                return res.status(401).json({ message: 'Credenciales incorrectas'})
            }
        })
    }catch(error){
        console.error('Error al procesar la solicitud de inicio de sesión: ',error);
        return res.status(500).json({error: 'Error en el servidor'});
    }
};

function generateToken(email: string){
    return jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES });
}