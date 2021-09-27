import { Pool } from "pg";
require('dotenv').config()

export const createDB = () => {
  return new Pool({
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  });
};

export const addTest = async data => {
  const res = await createDB().query(
    `INSERT INTO tests(id,color,price) VALUES ('${data.id}','${data.color}','${data.price}') RETURNING *;`
  );

  return res
}

export const checkTest = async data => {
  const res = await createDB().query(
    `SELECT * from tests WHERE id = '${data.id}'`
  );

  return res.rows.length > 0;
}

export const getTests = async () => {
  const res = await createDB().query(
    `SELECT * from tests`
  );

  return res.rows;
}