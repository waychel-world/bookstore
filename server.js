


const express = require("express");
const mysql = require('mysql2'); // Use mysql2 instead of mysql
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(bodyParser.json()); // Parse JSON request bodies

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'books_db', // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Route to save book details
app.post("/saveBook", (req, res) => {
  const { title, author, summary, genre, smallCover, largeCover } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required!" });
  }

  const sql = `
    INSERT INTO books (title, author, summary, genre, small_cover, large_cover)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, author, summary, genre, smallCover, largeCover], (err, result) => {
    if (err) {
      console.error("Error saving book details:", err);
      return res.status(500).json({ error: "Failed to save book details." });
    }
    res.json({ success: true, message: "Book details saved successfully!" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
