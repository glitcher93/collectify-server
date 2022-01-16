const knex = process.env.NODE_ENV === 'production' ? require('knex')(require('../knexfile').production) : require('knex')(require('../knexfile').development);
const jwt = require("jsonwebtoken");

exports.getWishlist = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, 'tempkey', (err, decoded) => decoded)
    knex("wishlist")
    .where({userId: user.id})
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).send(`Ran into an error getting wishlist data: ${err}`)
        })
}

exports.postNewItem = (req, res) => {
    knex("wishlist")
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

exports.getWishlistItem = (req, res) => {
    knex("wishlist")
        .where({id: req.params.itemId})
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).send(`Ran into an error getting item in wishlist: ${err}`)
        })
}

exports.updateWishlistItem = (req, res) => {
    knex("wishlist")
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

exports.deleteItem = (req, res) => {
    knex("wishlist")
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