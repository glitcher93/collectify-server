// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: "127.0.0.1",
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      charset: 'utf8'
    }
  },
  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL
  }
};
