const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  // password: '' It doesnt have any password, If required, set it here.
  database: 'assignment6',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

// API endpoint to retrieve user timeline data
app.get('/timeline/:userId', (req, res) => {
  const userId = req.params.userId;

  // Perform an INNER JOIN to retrieve timeline data for the specified user
  const query = `
    SELECT A01380859_user_timeline.*, A01380859_user.user_name
    FROM A01380859_user_timeline
    INNER JOIN A01380859_user ON A01380859_user.id = A01380859_user_timeline.user_id
    WHERE A01380859_user.id = ?
  `;

  // Execute the query
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Catch-all route to serve index.html for any other request
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
