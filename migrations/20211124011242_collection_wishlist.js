
exports.up = function(knex) {
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
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("collection")
        .dropTable("wishlist")
        .dropTable("users");
};
