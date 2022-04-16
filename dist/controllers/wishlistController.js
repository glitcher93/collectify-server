"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateWishlistItem = exports.getWishlistItem = exports.postNewItem = exports.getWishlist = void 0;
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const getWishlist = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jsonwebtoken_1.default.verify(token, secret);
    (0, db_1.default)("wishlist")
        .where({ userId: user.id })
        .then((data) => {
        res.json(data);
    })
        .catch(err => {
        res.status(400).send(`Ran into an error getting wishlist data: ${err}`);
    });
};
exports.getWishlist = getWishlist;
const postNewItem = (req, res) => {
    (0, db_1.default)("wishlist")
        .insert(req.body)
        .then((data) => {
        res.status(201).json({
            message: "Item posted to wishlist successfully",
            data
        });
    })
        .catch(err => {
        res.status(400).send(`Ran into an error posting new item to wishlist: ${err}`);
    });
};
exports.postNewItem = postNewItem;
const getWishlistItem = (req, res) => {
    (0, db_1.default)("wishlist")
        .where({ id: req.params.itemId })
        .then((data) => {
        res.json(data);
    })
        .catch(err => {
        res.status(400).send(`Ran into an error getting item in wishlist: ${err}`);
    });
};
exports.getWishlistItem = getWishlistItem;
const updateWishlistItem = (req, res) => {
    (0, db_1.default)("wishlist")
        .update(req.body)
        .where({ id: req.params.itemId })
        .then((data) => {
        res.status(200).json({
            message: "Item updated successfully",
            data
        });
    })
        .catch(err => {
        res.status(400).send(`Ran into an error updating item in wishlist: ${err}`);
    });
};
exports.updateWishlistItem = updateWishlistItem;
const deleteItem = (req, res) => {
    (0, db_1.default)("wishlist")
        .delete()
        .where({ id: req.params.itemId })
        .then(() => {
        res.status(200).json({
            message: "Item has been successfully deleted"
        });
    })
        .catch(err => {
        res.status(400).send(`Ran into an error deleting item in wishlist: ${err}`);
    });
};
exports.deleteItem = deleteItem;
