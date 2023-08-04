const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3002; // Choose any available port

// Parse requests of content-type 'application/json'
app.use(bodyParser.json());

// Parse requests of content-type 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({ extended: true }));

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: '127.0.0.1', // Replace with your database host
  user: 'root', // Replace with your database user
  password: '', // Replace with your database password
  database: 'combinatorialauction_bd' // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

// Close the database connection on server shutdown
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//--------------------------------  API endpoint to retrieve data from a table
app.get('/api/data/auctions', (req, res) => {
  const query = 'SELECT * FROM auctions';

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/data/articles', (req, res) => {
  const query = 'SELECT * FROM articles';

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
