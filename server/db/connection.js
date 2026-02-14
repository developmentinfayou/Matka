// db/connection.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',  // XAMPP's default root password is blank
//     database: 'goagamesblue',
//     port: 3306
// });

// for live pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'myuser',
    password: process.env.DB_PASSWORD || 'StrongPassword123!',
    database: process.env.DB_NAME || 'matka',
    port: process.env.DB_PORT || 3306,
    // dateStrings: true ,
});


// for local devlopment  poll
// const pool = mysql.createPool({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD ?? '',
//     database: process.env.DB_NAME || '888',
//     port: process.env.DB_PORT || 3306,
// });

export default pool;
