import { connection } from "./connectionToDB.js";

export const insertUserEmail = async (email, lastName, firstName = null) => {
    try{
        const sqlQuery = {
            text: 'INSERT INTO users(email, first_name, last_name) VALUES($1, $2, $3)',
            values: [email, firstName, lastName]
        }
        return connection.query(sqlQuery);
    }
    catch(err){
        console.log(err);
        throw err;
    }
} 

export const findUserEmail = async (email) => {
    try{
        const sqlQuery = {
            text: 'SELECT email FROM users WHERE email = $1',
            values: [email]
        }
        return connection.query(sqlQuery); 
    }
    catch(err){
        console.log(err);
        throw err;
    }
}