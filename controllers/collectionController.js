const knex = process.env.NODE_ENV === 'production' ? require('knex')(require('../knexfile').production) : require('knex')(require('../knexfile').development);
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const serverURL = process.env.SERVER_URL || 'http://localhost:8080'

exports.getCollection = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, 'tempkey', (err, decoded) => decoded)
    knex("collection")
        .where({userId: user.id})
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).send(`Ran into an error getting collection data: ${err}`)
        })
}

exports.postNewItem = (req, res) => {
    knex("collection")
        .insert(req.body)
        .then((data) => {
            res.status(201).json({
                message: "Item posted to collection successfully",
                data
            })
        })
        .catch(err => {
            res.status(400).send(`Ran into an error posting new item to collection: ${err}`)
        })
}

exports.getCollectionItem = (req, res) => {
    knex("collection")
        .where({id: req.params.itemId})
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).send(`Ran into an error getting item in collection: ${err}`)
        })
}

exports.updateItem = (req, res) => {
    knex("collection")
        .update(req.body)
        .where({id: req.params.itemId})
        .then((data) => {
            res.status(200).json({
                message: "Item has been successfully updated",
                data
            })
        })
        .catch(err => {
            res.status(400).send(`Ran into an error updating item in collection: ${err}`)
        })
}

exports.deleteItem = (req, res) => {
    knex("collection")
        .where({id: req.params.itemId})
        .then((album) => {
            if (album[0].image.startsWith(serverURL)) {
                fs.unlink("public" + album[0].image.replace(serverURL, ''), (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
            }
            return;
        })
    knex("collection")    
        .delete()
        .where({id: req.params.itemId})
        .then(() => {
            res.status(200).json({
                message: "Item has been successfully deleted"
            })
        })
        .catch(err => {
            res.status(400).send(`Ran into an error deleting item in collection: ${err}`)
        })
}

exports.addNewAlbum = (req, res) => {
    const { albumTitle, artist, releaseDate, numTracks, medium, numCopies, description, userId } = req.body;
    knex("collection")
        .insert({
            image: `${serverURL}/images/${req.file.filename}`,
            albumTitle,
            artist,
            releaseDate,
            numTracks,
            medium,
            numCopies,
            description,
            userId: Number(userId)
        })
        .then((data) => {
            res.status(201).json({
                message: "Item posted to collection successfully",
                data
            })
        })
        .catch(err => {
            res.status(400).send(`Ran into an error posting new item to collection: ${err}`)
        })
}