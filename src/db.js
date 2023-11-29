const { Pool } = require('pg');
const { db } = require('./config')

const pool = new Pool({
    user: db.user,
    password: db.password,
    port: db.port,
    host: db.host,
    database: db.database,
});

module.exports = pool;