import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface IRequest extends Request {
    payload?: string | JwtPayload
}

const auth = (req: IRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(403).json({
            message: "No token, access denied"
        })
    }
    const token = req.headers.authorization!.split(' ')[1];
    jwt.verify(token, 'tempkey', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Token is expired or invalid"
            });
        }
        req.payload = decoded
        next();
    })
}

export default auth;