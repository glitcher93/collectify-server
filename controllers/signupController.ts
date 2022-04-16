import db from '../db';
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

const signup = (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync(10);
    const { firstName, lastName, username, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, salt);
    db
        .select("username")
        .from("users")
        .where("username", username)
        .then(result => {
            if (!result.length) {
                return db("users")
                .insert({
                    firstName,
                    lastName,
                    username,
                    password: hashedPassword
                })
                .then((data) => {
                    res.status(201).json({
                        message: "User successfully signed up",
                        data
                    })
                })
                .catch((err) => {
                    res.status(400).send(`Ran into an error signing up new user: ${err}`)
                })
            } else {
                res.status(400).send(`Username already exists`);
            }
        })
        .catch((err) => {
            res.status(400).send(`Ran into an error retrieving selected user info: ${err}`);
        })
    
}

export default signup;