"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup = (req, res) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    const { firstName, lastName, username, password } = req.body;
    const hashedPassword = bcrypt_1.default.hashSync(password, salt);
    db_1.default
        .select("username")
        .from("users")
        .where("username", username)
        .then(result => {
        if (!result.length) {
            return (0, db_1.default)("users")
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
                });
            })
                .catch((err) => {
                res.status(400).send(`Ran into an error signing up new user: ${err}`);
            });
        }
        else {
            res.status(400).send(`Username already exists`);
        }
    })
        .catch((err) => {
        res.status(400).send(`Ran into an error retrieving selected user info: ${err}`);
    });
};
exports.default = signup;
