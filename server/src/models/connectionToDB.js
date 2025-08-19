import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const {Pool} = pg;

// * Crete and export connection
export const connection = new Pool({
  host: process.env.HOST,
  user: process.env.PGUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

connection.connect((err) => err ? console.error("Connection error", err) : console.log("Connected to the database"));