import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config()

interface IKnexConfig {
  [key: string]: Knex.Config
}

const config: IKnexConfig = {

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

export default config;
