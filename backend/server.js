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
    } else if (results.length == 0) {
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
app.get("/api/auctions", (req, res) => {
  const query = "SELECT * FROM auctions ORDER BY end_time DESC;";

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
  const query = "SELECT * FROM articles ; ";

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    } else {
      res.json(results);
    }
  });
});
//account info api:
app.get("/api/data/users/:userid", (req, res) => {
  const { userid } = req.params;
  const query = "SELECT * FROM users WHERE user_id = ?"; // Assuming 'userid' is the correct column name

  connection.query(query, [userid], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving user data from the database");
    } else if (results.length == 0) {
      res.status(404).send("User not found");
    } else {
      const user = results[0];
      res.json(user);
    }
  });
});
app.get("/api/data/articles/:auctionId", (req, res) => {
  const { auctionId } = req.params;
  const query = "SELECT * FROM articles WHERE auction_id = ?";

  connection.query(query, [auctionId], (err, results) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send("Error retrieving auction details from the database");
    } else if (results.length == 0) {
      res.status(404).send("Auction not found");
    } else {
      const auction = results[0];
      res.json(auction);
    }
  });
});

app.get("/api/data/auctions/:auctionId", (req, res) => {
  const { auctionId } = req.params;
  const query = "SELECT * FROM auctions WHERE auction_id = ?";

  connection.query(query, [auctionId], (err, results) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send("Error retrieving auction details from the database");
    } else if (results.length == 0) {
      res.status(404).send("Auction not found");
    } else {
      const auction = results[0];
      res.json(auction);
    }
  });
});

//my articles page api (jointure entre articles and user)
//for the ones that are included in aucitons:
// app.get("/api/data/myarticles/:userId", (req, res) => {
//   const userId = req.params.userId;
//   const query =
//     "SELECT * FROM articles WHERE auction_id IN (SELECT auction_id FROM auctions WHERE auctioneer_id = ?)";

//   connection.query(query, [userId], (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error retrieving data from the database");
//     } else {
//       res.json(results);
//     }
//   });
// });

app.get("/api/data/selectarticles", (req, res) => {
  const { auctioneer_id } = req.query;

  const query = `SELECT * FROM articles WHERE auctioneer_id = ? AND auction_id IS NULL`;
  const values = [auctioneer_id];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/data/myarticles/:userId", (req, res) => {
  const userId = req.params.userId;
  const query =
    "SELECT * FROM articles WHERE auctioneer_id = ? ORDER BY auction_id IS NULL DESC; ";

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    } else {
      res.json(results);
    }
  });
});

//my bids page api (jointure entre bids and aucitons)
app.get("/api/data/bids/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT b.*, au.title AS auction_title
    FROM bids b
    JOIN auctions au ON b.auction_id = au.auction_id
    WHERE b.bidder_id = ?
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    } else {
      res.json(results);
    }
  });
});

// API endpoint for saving article details
app.post("/api/putarticle", (req, res) => {
  // Extract the article details from the request body
  const { title, units, description, auctioneer_id } = req.body;

  // Save the article details to the "articles" table in your database
  const query =
    "INSERT INTO articles (title, units, description, auctioneer_id) VALUES (?, ?, ?, ?)";
  const values = [title, units, description, auctioneer_id];

  connection.query(query, values, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving article details");
    } else {
      res.status(200).send("Article details saved");
    }
  });
});
// Route to create an auction
app.post("/api/postauctions", (req, res) => {
  const { title, startingTime, endingTime, description, auctioneer_id } =
    req.body;

  // Convert datetime values to the correct format
  const formattedStartTime = new Date(startingTime)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const formattedEndTime = new Date(endingTime)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const auctionQuery =
    "INSERT INTO Auctions (title, start_time, end_time, description, auctioneer_id) VALUES (?, ?, ?, ?, ?)";
  const auctionValues = [
    title,
    formattedStartTime,
    formattedEndTime,
    description,
    auctioneer_id,
  ];

  connection.query(auctionQuery, auctionValues, (auctionErr, auctionResult) => {
    if (auctionErr) {
      console.error(auctionErr);
      res.status(500).send("Error creating auction");
    } else {
      const newAuctionId = auctionResult.insertId;

      // Update articles' auction IDs here
      const { selectedArticles } = req.body;

      selectedArticles.forEach(async (articleId) => {
        const articleQuery =
          "UPDATE articles SET auction_id = ? WHERE article_id = ?";
        const articleValues = [newAuctionId, articleId];

        try {
          await connection.query(articleQuery, articleValues);
          console.log(
            `Article ${articleId} updated with auction ID ${newAuctionId}`
          );
        } catch (articleErr) {
          console.error(`Error updating article ${articleId}:`, articleErr);
        }
      });

      res.status(201).json({ auction_id: newAuctionId });
    }
  });
});
///-----------
///-----------
///-----------
///-----------
///-----------
///-----------
///-----------
// Import necessary modules and set up your Express app

// Endpoint to create a new bid

//////

//******************************************************************************************************************** */
// API route to get collections based on bid_id
app.get("/api/get-collections/:bidId", (req, res) => {
  const { bidId } = req.params;
  const query = "SELECT * FROM collections WHERE bid_id = ?";

  connection.query(query, [bidId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving collections from the database");
    } else {
      res.json(results);
    }
  });
});

// API route to get an existing bid for a user and auction
function getExistingBid(auctionId, bidderId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM bids WHERE auction_id = ? AND bidder_id = ?";
    connection.query(query, [auctionId, bidderId], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length === 0) {
        resolve(null); // Resolve with null if no bid is found
      } else {
        resolve(results[0]);
      }
    });
  });
}

// Define the route using the function
app.get("/api/get-existing-bid/:userid/:auctionid", async (req, res) => {
  const { userid, auctionid } = req.params;
  try {
    const existingBid = await getExistingBid(auctionid, userid);
    if (existingBid) {
      res.json(existingBid);
    } else {
      res.status(404).json({ message: "Bid not found" });
    }
  } catch (error) {
    console.error("Error retrieving existing bid:", error);
    res.status(500).send("Error retrieving existing bid from the database");
  }
});

app.post("/api/create-or-update-bid", async (req, res) => {
  try {
    // Extract data from the request body
    const { auction_id, bidder_id, price, collections, bid_id } = req.body;
    const put_time = new Date();

    // Check if a bid for the same auction and bidder already exists
    const existingBid = await getExistingBid(auction_id, bidder_id);

    if (existingBid) {
      // Update the existing bid
      await connection.query("UPDATE bids SET price = ? WHERE bid_id = ?", [
        price,
        existingBid.bid_id,
      ]);
      const bidId = existingBid.bid_id;
      updateCollections(bidId, collections);
      res.json({
        message: "Bid and collections updated successfully",
        bid_id: bidId,
      });
    } else {
      // Create a new bid
      const newBid = await createNewBid(auction_id, bidder_id, price, put_time);
      const bidId = newBid.insertId;
      updateCollections(bidId, collections);
      res.json({
        message: "Bid and collections created successfully",
        bid_id: bidId,
      });
    }
  } catch (error) {
    console.error("Error creating/updating bid and collections:", error);
    res
      .status(500)
      .json({ message: "Error creating/updating bid and collections" });
  }
});

async function createNewBid(auction_id, bidder_id, price, put_time) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO bids (auction_id, bidder_id, price, put_time) VALUES (?, ?, ?, ?)",
      [auction_id, bidder_id, price, put_time],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

async function updateCollections(bidId, collections) {
  try {
    for (const collection of collections) {
      const { collection_id, units } = collection;

      // Check if a collection for the same collection_id and bid_id already exists
      const existingCollection = await getExistingCollection(
        collection_id,
        bidId
      );

      if (existingCollection) {
        // Update the existing collection
        await connection.query(
          "UPDATE collections SET units = ? WHERE collection_id = ? AND bid_id = ?",
          [units, collection_id, bidId]
        );
      } else {
        // Create a new collection
        await connection.query(
          "INSERT INTO collections (collection_id, bid_id, units) VALUES (?, ?, ?)",
          [collection_id, bidId, units]
        );
      }
    }
  } catch (error) {
    console.error("Error updating collections:", error);
    throw error;
  }
}

// Function to get an existing collection
function getExistingCollection(collectionId, bidId) {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM collections WHERE collection_id = ? AND bid_id = ?";
    connection.query(query, [collectionId, bidId], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length === 0) {
        resolve(null); // Resolve with null if no collection is found
      } else {
        resolve(results[0]);
      }
    });
  });
}
///////////////////

// Define the API endpoint to fetch the data
// Fetch bidders for the specified auction
app.get("/api/bidders/:auction_id", (req, res) => {
  const auctionId = req.params.auction_id;

  const sqlQuery = `
    SELECT u.user_id, u.family_name, u.name, b.put_time, b.price
    FROM users u
    JOIN bids b ON u.user_id = b.bidder_id
    WHERE b.auction_id = ?;
  `;

  connection.query(sqlQuery, [auctionId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json(results);
  });
});

// Fetch collections for the specified bidder
// Define a route to fetch collections for a specific user and auction
app.get("/api/collections/:user_id/:auction_id", (req, res) => {
  const userId = req.params.user_id;
  const auctionId = req.params.auction_id;
  const sqlQuery = `
  SELECT a.title, c.units,c.collection_id, b.bidder_id, a.units AS stock_limit
  FROM articles a
  JOIN collections c ON a.article_id = c.collection_id
  JOIN bids b ON c.bid_id = b.bid_id
  WHERE b.bidder_id = ? AND a.auction_id = ?;
  
  `;

  connection.query(sqlQuery, [userId, auctionId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json(results);
  });
});

app.post("/api/winners/:auctionId", (req, res) => {
  const auctionId = req.params.auctionId; // Get auctionId from URL parameters
  const dataFromPython = req.body; // Data sent from Python script
  // Process the data and use the auctionId as needed here

  // Send a response back to Python (optional)
  res.json({ message: "Data received successfully." });
});
////////////////////////////

////////////////
// for test

app.get("/api/users", (req, res) => {
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

app.get("/api/data/*", (req, res) => {
  res.status(404).send("Endpoint not found");
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
