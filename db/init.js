var pgtools = require("pgtools");
var pg = require("pg");
require('dotenv').config()

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
};

pgtools.createdb(config, "testdb", function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
  }
  );

  pool.query("CREATE TABLE tests(id text NOT NULL, color text NOT NULL, price text NOT NULL)",
    (err, res) => {
      console.log(err, res);
      pool.end();
    });
});