require('dotenv').config({ path: './config.env' }); 

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Fixes CORS errors
app.use(bodyParser.json()); // Parses JSON request bodies

/* MySQL Connection 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306, // MySQL default port
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'books_database', // mySQL database name
});
*/


const db = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bookstore'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
    console.log('Connected to MAMP MySQL database.');
});



/*

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});


*/



// Route to handle adding book data to the database
app.post('/add-book', (req, res) => {
    const { 
        isbn, 
        title, 
        authors, 
        genre, 
        summary, 
        book_condition, 
        contribution, 
        smallCoverUrl, 
        largeCoverUrl, 
    } = req.body;

    if (!isbn || !title || !authors || !genre || !summary || !book_condition || !contribution || !smallCoverUrl || !largeCoverUrl) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = `
        INSERT INTO books 
        (isbn, title, authors, genre, summary, book_condition, contribution, smallCoverUrl, largeCoverUrl) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.execute(query, [isbn, title, authors, genre, summary, book_condition, contribution, smallCoverUrl, largeCoverUrl], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            return res.status(500).json({ error: 'Failed to add book to the database.' });
        }
        res.status(200).json({ message: 'Book added successfully!', bookId: results.insertId });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



const path = require('path');

// Serve the favicon
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.listen(5500, () => {
    console.log('Server is running on http://127.0.0.1:5500');
});
