const knex = process.env.NODE_ENV === 'production' ? require('knex')(require('../knexfile').production) : require('knex')(require('../knexfile').development);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.login = (req, res) => {
    const { username, password } = req.body;
    knex("users")
        .then(users => {
            const foundUser = users.find(user => user.username === username);
            const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password)
            if (foundUser && isPasswordCorrect) {
                const payload = {
                    id: foundUser.id,
                    username: foundUser.username,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    issuedAt: Date.now()
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