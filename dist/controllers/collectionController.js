"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewAlbum = exports.deleteItem = exports.updateItem = exports.getCollectionItem = exports.postNewItem = exports.getCollection = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const serverURL = process.env.SERVER_URL || 'http://localhost:8080';
const getCollection = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jsonwebtoken_1.default.verify(token, secret);
    (0, db_1.default)("collection")
        .where({ userId: user.id })
        .then((data) => {
        res.json(data);
    })
        .catch((err) => {
        res.status(400).send(`Ran into an error getting collection data: ${err}`);
    });
};
exports.getCollection = getCollection;
const postNewItem = (req, res) => {
    (0, db_1.default)("collection")
        .insert(req.body)
        .then(() => {
        res.status(201).json({
            message: "Item posted to collection successfully",
        });
    })
        .catch((err) => {
        res.status(400).send(`Ran into an error posting new item to collection: ${err}`);
    });
};
exports.postNewItem = postNewItem;
const getCollectionItem = (req, res) => {
    (0, db_1.default)("collection")
        .where({ id: req.params.itemId })
        .then((data) => {
        res.json(data);
    })
        .catch((err) => {
        res.status(400).send(`Ran into an error getting item in collection: ${err}`);
    });
};
exports.getCollectionItem = getCollectionItem;
const updateItem = (req, res) => {
    (0, db_1.default)("collection")
        .update(req.body)
        .where({ id: req.params.itemId })
        .then(() => {
        res.status(200).json({
            message: "Item has been successfully updated",
        });
    })
        .catch((err) => {
        res.status(400).send(`Ran into an error updating item in collection: ${err}`);
    });
};
exports.updateItem = updateItem;
const deleteItem = (req, res) => {
    (0, db_1.default)("collection")
        .where({ id: req.params.itemId })
        .then((album) => {
        if (album[0].image.startsWith(serverURL)) {
            fs_1.default.unlink("public" + album[0].image.replace(serverURL, ''), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        return;
    });
    (0, db_1.default)("collection")
        .delete()
        .where({ id: req.params.itemId })
        .then(() => {
        res.status(200).json({
            message: "Item has been successfully deleted"
        });
    })
        .catch((err) => {
        res.status(400).send(`Ran into an error deleting item in collection: ${err}`);
    });
};
exports.deleteItem = deleteItem;
const addNewAlbum = (req, res) => {
    const { albumTitle, artist, releaseDate, numTracks, medium, numCopies, description, userId } = req.body;
    (0, db_1.default)("collection")
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
        .then(() => {
        res.status(201).json({
            message: "Item posted to collection successfully",
        });
    })
        .catch((err) => {
        res.status(400).send(`Ran into an error posting new item to collection: ${err}`);
    });
};
exports.addNewAlbum = addNewAlbum;
