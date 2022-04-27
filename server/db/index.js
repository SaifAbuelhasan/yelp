const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config();

// pg library knows where to look for the environment variables to connect with the db.
/* const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'yelp',
    password: 'ctx123dell',
    port: 5432,
}) */

const pool = new Pool()

const db = {
    query: (text, params) => pool.query(text, params),
}
module.exports = db