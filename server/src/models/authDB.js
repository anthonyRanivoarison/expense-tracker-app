import { connection } from "./connectionToDB.js";

export const insertUserEmail = async (email) => {
    const insertion = connection.query('SELECT * FROM users'); //test connectivity
} 