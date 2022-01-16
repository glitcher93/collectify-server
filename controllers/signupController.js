const knex = require('knex')(require('../knexfile').development);
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    knex("users")
        .insert({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
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
}