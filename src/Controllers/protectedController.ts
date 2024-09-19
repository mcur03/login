import { Request, Response, NextFunction } from 'express';

export function protectedApi(req: Request, res: Response, next: NextFunction){
    console.log('mis tuits')
    res.json({
        tuits: [
            {
                id: 0,
                text: 'Este es mi primer tuits',
                username: 'vidmarr'
            },
            {
                id: 1,
                text: 'Este es mi segundo tuits',
                username: 'capella'
            },
            {
                id: 2,
                text: 'Este es mi tercer tuits',
                username: 'ossa'
            }
        ]
    });
};