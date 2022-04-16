import { Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken'
import db from '../db';

const serverURL = process.env.SERVER_URL || 'http://localhost:8080'

interface CollectionItem {
    id: number
    image: string
    albumTitle: string
    artist: string
    releaseDate: string
    numTracks: number
    medium: string
    numCopies: number
    description: string
    userId: number
    updated_at: number
}

interface User {
    id: string
    username: string
    firstName: string
    lastName: string
}

export const getCollection = (req: Request, res: Response) => {
    const token = req.headers.authorization!.split(' ')[1];
    const user = jwt.verify(token, 'tempkey') as User;
    db("collection")
        .where({userId: user.id})
        .then((data: CollectionItem[]) => {
            res.json(data);
        })
        .catch((err: ErrorCallback) => {
            res.status(400).send(`Ran into an error getting collection data: ${err}`)
        })
}

export const postNewItem = (req: Request, res: Response) => {
    db("collection")
        .insert(req.body)
        .then(() => {
            res.status(201).json({
                message: "Item posted to collection successfully",
            })
        })
        .catch((err: ErrorCallback) => {
            res.status(400).send(`Ran into an error posting new item to collection: ${err}`)
        })
}

export const getCollectionItem = (req: Request, res: Response) => {
    db("collection")
        .where({id: req.params.itemId})
        .then((data: CollectionItem[]) => {
            res.json(data)
        })
        .catch((err: ErrorCallback) => {
            res.status(400).send(`Ran into an error getting item in collection: ${err}`)
        })
}

export const updateItem = (req: Request, res: Response) => {
    db("collection")
        .update(req.body)
        .where({id: req.params.itemId})
        .then(() => {
            res.status(200).json({
                message: "Item has been successfully updated",
            })
        })
        .catch((err: ErrorCallback) => {
            res.status(400).send(`Ran into an error updating item in collection: ${err}`)
        })
}

export const deleteItem = (req: Request, res: Response) => {
    db("collection")
        .where({id: req.params.itemId})
        .then((album: CollectionItem[]) => {
            if (album[0].image.startsWith(serverURL)) {
                fs.unlink("public" + album[0].image.replace(serverURL, ''), (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
            }
            return;
        })
    db("collection")    
        .delete()
        .where({id: req.params.itemId})
        .then(() => {
            res.status(200).json({
                message: "Item has been successfully deleted"
            })
        })
        .catch((err: ErrorCallback) => {
            res.status(400).send(`Ran into an error deleting item in collection: ${err}`)
        })
}

export const addNewAlbum = (req: Request, res: Response) => {
    const { albumTitle, artist, releaseDate, numTracks, medium, numCopies, description, userId } = req.body;
    db("collection")
        .insert({
            image: `${serverURL}/images/${req.file!.filename}`,
            albumTitle,
            artist,
            releaseDate,
            numTracks,
            medium,
            numCopies,
            description,
            userId: Number(userId)
        })
        .then(() => {
            res.status(201).json({
                message: "Item posted to collection successfully",
            })
        })
        .catch((err: ErrorCallback) => {
            res.status(400).send(`Ran into an error posting new item to collection: ${err}`)
        })
}