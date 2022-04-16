"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(403).json({
            message: "No token, access denied"
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    jsonwebtoken_1.default.verify(token, 'tempkey', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Token is expired or invalid"
            });
        }
        req.payload = decoded;
        next();
    });
};
exports.default = auth;
