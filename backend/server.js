const bcrypt = require("bcrypt");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors"); // Import the cors package

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Use the cors middleware to enable cross-origin requests

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "combinatorialauction_bd",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

process.on("SIGINT", () => {
  connection.end();
  process.exit();
});

// No CORS middleware here, so all origins are allowed
//******************************************************************************************************************** */
//---------------------------- register api
app.post("/api/register", (req, res) => {
  const {
    username,
    password,
    name,
    family_name,
    email,
    account_type,
    contact_info,
  } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error hashing password");
    } else {
      const query =
        "INSERT INTO Users (username, password, name, family_name, email, account_type, contact_info) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [
        username,
        hash,
        name,
        family_name,
        email,
        account_type,
        contact_info,
      ];

      connection.query(query, values, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error registering user");
        } else {
          res.status(200).send("User registered successfully");
        }
      });
    }
  });
});
//----------------------------- login api
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM Users WHERE username = ?";
  connection.query(query, [username], async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving user data");
    } else if (results.length === 0) {
      res.status(401).send("User not found");
    } else {
      const user = results[0];

      // Compare provided password with hashed password in the database
      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) {
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Invalid password");
      }
    }
  });
});

//--------------------------------  API endpoint to retrieve data from a table
app.get("/api/data/auctions", (req, res) => {
  const query = "SELECT * FROM auctions";

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/data/articles", (req, res) => {
  const query = "SELECT * FROM articles";

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    } else {
      res.json(results);
    }
  });
});
//******************************************************************************************************************** */

// for test

app.get("/api/data/users", (req, res) => {
  const query = "SELECT * FROM users";

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    } else {
      res.json(results);
    }
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
