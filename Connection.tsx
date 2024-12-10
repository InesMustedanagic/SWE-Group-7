import mysql from 'mysql';
import dotenv from 'dotenv';

// file not used
// i think this is outdated
// too late to check test cases on if we can remove this file
// file not used
// originally was supposed to be used for connecting to database

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err: { message: any; }) => {
    if (err){
        console.log(err.message);
        return;
    }
    else{
        console.log("connected to database")
    }
})
export default (db);