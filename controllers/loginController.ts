import { Request, Response } from "express";
import db from '../db';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

exports.login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    db("users")
        .then(users => {
            const foundUser = users.find(user => user.username === username);
            const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password)
            if (foundUser && isPasswordCorrect) {
                const payload = {
                    id: foundUser.id,
                    username: foundUser.username,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                };
                const token = jwt.sign(payload, 'tempkey', {expiresIn: '3h'});
                res.status(200).json({
                    token
                });
            }
        })
        .catch(err => {
            res.status(401).json({
                message: "Invalid username or password"
            })
        })
}