const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "root",
    port: 5432,
    host: "localhost",
    database: "tasksdb"
});

module.exports = pool;