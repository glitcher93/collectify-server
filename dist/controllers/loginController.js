"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const login = (req, res) => {
    const { username, password } = req.body;
    (0, db_1.default)("users")
        .then(users => {
        const foundUser = users.find(user => user.username === username);
        const isPasswordCorrect = bcrypt_1.default.compareSync(password, foundUser.password);
        if (foundUser && isPasswordCorrect) {
            const payload = {
                id: foundUser.id,
                username: foundUser.username,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
            };
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '3h' });
            res.status(200).json({
                token
            });
        }
    })
        .catch(err => {
        res.status(401).json({
            message: "Invalid username or password"
        });
    });
};
exports.default = login;
