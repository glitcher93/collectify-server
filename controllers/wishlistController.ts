import { Request, Response } from 'express';
import db from '../db';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

interface User {
    id: string
    username: string
    firstName: string
    lastName: string
}

const secret = process.env.JWT_SECRET as Secret;

export const getWishlist = (req: Request, res: Response) => {
    const token = req.headers.authorization!.split(' ')[1];
    const user = jwt.verify(token, secret) as User;
    db("wishlist")
        .where({userId: user.id})
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).send(`Ran into an error getting wishlist data: ${err}`)
        })
}

export const postNewItem = (req: Request, res: Response) => {
    db("wishlist")
        .insert(req.body)
        .then((data) => {
            res.status(201).json({
                message: "Item posted to wishlist successfully",
                data
            })
        })
        .catch(err => {
            res.status(400).send(`Ran into an error posting new item to wishlist: ${err}`)
        })
}

export const getWishlistItem = (req: Request, res: Response) => {
    db("wishlist")
        .where({id: req.params.itemId})
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).send(`Ran into an error getting item in wishlist: ${err}`)
        })
}

export const updateWishlistItem = (req: Request, res: Response) => {
    db("wishlist")
        .update(req.body)
        .where({id: req.params.itemId})
        .then((data) => {
            res.status(200).json({
                message: "Item updated successfully",
                data
            })
        })
        .catch(err => {
            res.status(400).send(`Ran into an error updating item in wishlist: ${err}`)
        })
}

export const deleteItem = (req: Request, res: Response) => {
    db("wishlist")
        .delete()
        .where({id: req.params.itemId})
        .then(() => {
            res.status(200).json({
                message: "Item has been successfully deleted"
            })
        })
        .catch(err => {
            res.status(400).send(`Ran into an error deleting item in wishlist: ${err}`)
        })
}