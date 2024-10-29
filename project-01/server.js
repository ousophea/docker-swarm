'use strict';

const express = require('express');
const mysql = require('mysql2/promise'); // Using mysql2/promise for cleaner syntax

// Database configuration (replace with your actual credentials)
const dbConfig = {
  host: 'sample_mysql',
  user: 'root',
  password: 'root',
  database: 'sample_db'
};

// Create a connection pool for improved performance and handling of multiple requests
const pool = mysql.createPool(dbConfig);

// Express app
const app = express();

// Function to handle database operations (can be customized for specific queries)
async function executeQuery(sql, params = []) {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    throw error; // Re-throw for handling in error middleware
  }
}

// Route example with database access (replace with your desired logic)
app.get('/users', async (req, res) => {
  try {
    const users = await executeQuery('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).send('Error retrieving users'); // Handle errors gracefully
  }
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error'); // Generic error response
});

// Constants
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

// Start the server
app.listen(PORT, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});