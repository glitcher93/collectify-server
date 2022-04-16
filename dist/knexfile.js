"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        client: 'mysql',
        connection: {
            host: "127.0.0.1",
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB_NAME,
            charset: 'utf8'
        },
        debug: true,
        useNullAsDefault: true
    },
    production: {
        client: 'mysql',
        connection: process.env.JAWSDB_URL
    }
};
exports.default = config;
