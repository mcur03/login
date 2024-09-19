import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function validarToken(req:Request, res:Response, netx:NextFunction){
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token) res.status(401).json({ Error: 'Access denied' });

    jwt.verify(token as string, process.env.JWT_SECRET as string, (err) => {
        if(err){
            console.error('Access denied, token expired or incorrect', err.message);
            return res.status(401).json({ message: 'Access denied, token expired or incorrect' })
        }else{
            console.log('Autenticado');
            netx();
        }
    });
}