// require('dotenv').config({ path: './config.env' }); 

// Serve the favicon 
/*
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});
*/


const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
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

const db = mysql.createPool({
    host: '127.0.0.1', // MAMP MySQL host
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bookstore'
});

// API endpoint to save book details for listing.html
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
        console.log("Book details saved successfully.");
    });
});



// Start the server
const PORT = 8000;


// Route to fetch books from database for index.html 
app.get('/api/books', async (req, res) => {
    
    try {
        // Example query to fetch books from the MySQL database
        const [rows] = await db.query('SELECT * FROM books'); 

        // Send the data as JSON
        res.json(rows);
    } catch (error) {
        console.error("Error fetching books from database:", error);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});



// Route to fetch book details by ID for book-details.html
app.get('/api/books/:id', async (req, res) => {

    const bookId = req.params.id; // Extract the book ID from the URL

    try {
        
        const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [bookId]);

        
        // Check if the book was found
        if (rows.length > 0) {
            res.json(rows[0]); // Send the book details as JSON
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database query failed' });
    }
});




// Route to fetch multiple book details for cart
app.post('/api/cart', async (req, res) => {
    try {
        const bookIds = req.body.ids;
        
        if (!bookIds || !Array.isArray(bookIds)) {
            return res.status(400).json({ error: 'Invalid book IDs format' });
        }

        // Convert IDs to numbers to avoid SQL type issues
        const numericIds = bookIds.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
        
        if (numericIds.length === 0) {
            return res.json([]);
        }

        const placeholders = numericIds.map(() => '?').join(',');
        const [rows] = await db.query(
            `SELECT * FROM books WHERE id IN (${placeholders})`,
            numericIds
        );

        res.json(rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
});
