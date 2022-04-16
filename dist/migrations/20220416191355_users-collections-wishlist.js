"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .createTable("users", (table) => {
            table.increments("id").primary();
            table.string("firstName").notNullable();
            table.string("lastName").notNullable();
            table.string("username").notNullable();
            table.string("password").notNullable();
        })
            .createTable("collection", (table) => {
            table.increments("id").primary();
            table.string("image").notNullable();
            table.string("albumTitle").notNullable();
            table.string("artist").notNullable();
            table.string("releaseDate").notNullable();
            table.integer("numTracks").notNullable();
            table.string("medium").notNullable();
            table.integer("numCopies").notNullable();
            table.string("description").notNullable();
            table
                .integer("userId")
                .unsigned()
                .notNullable();
            table
                .foreign("userId")
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
            .createTable("wishlist", (table) => {
            table.increments("id").primary();
            table.string("image").notNullable();
            table.string("albumTitle").notNullable();
            table.string("artist").notNullable();
            table.string("releaseDate").notNullable();
            table.integer("numTracks").notNullable();
            table.string("medium").notNullable();
            table.integer("numCopies").notNullable();
            table.string("description").notNullable();
            table
                .integer("userId")
                .unsigned()
                .notNullable();
            table
                .foreign("userId")
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .dropTable("collection")
            .dropTable("wishlist")
            .dropTable("users");
    });
}
exports.down = down;
