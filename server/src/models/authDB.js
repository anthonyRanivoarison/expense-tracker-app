import { connection } from "./connectionToDB.js";

export const insertUserEmail = async (email, lastName, firstName = null) => {
    try{
        const sqlQuery = {
            text: 'INSERT INTO users(email, first_name, last_name) VALUES($1, $2, $3)',
            values: [email, firstName, lastName]
        }
        connection.query(sqlQuery);
        console.log("Operation succeed");
    }
    catch(err){
        console.log(err);
        throw err;
    }
} 