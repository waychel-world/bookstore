// require('dotenv').config({ path: './config.env' }); 

// Serve the favicon 
/*
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});
*/


const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

// Middleware
app.use(cors()); // Fixes CORS errors
app.use(bodyParser.json()); // Parses JSON request bodies

// Serve static files from the "bookstore" directory
app.use(express.static(path.join(__dirname, 'bookstore')));




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
    host: '127.0.0.1', // MAMP MySQL host
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



// API endpoint to save book details
app.post('/api/books', (req, res) => {
    const { isbn, title, authors, genre, summary, book_condition, contribution, smallCoverUrl, largeCoverUrl } = req.body;

    const sql = `INSERT INTO books (isbn, title, authors, genre, summary, book_condition, contribution, smallCoverUrl, largeCoverUrl) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [isbn, title, authors, genre, summary, book_condition, contribution, smallCoverUrl, largeCoverUrl], (err, result) => {
        if (err) {
            console.error("Error inserting book details:", err);
            res.status(500).json({ message: "Failed to save book details." });
            return;
        }
        res.status(200).json({ message: "Book details saved successfully." });
    });
});



// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});







/* Route to handle adding book data to the database
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

*/