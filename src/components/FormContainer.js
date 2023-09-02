import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useAuth } from "./AuthContext";
import styles from "./FormContainer.module.css";

const FormContainer = ({ onBackClick, idauction }) => {
  const { userid } = useAuth(); // Assuming you have a way to get the user ID
  const [articles, setArticles] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});
  const [bidPrice, setBidPrice] = useState(0);
  const [existingBid, setExistingBid] = useState(null); // To store existing bid data

  useEffect(() => {
    fetchData();
    fetchExistingBid(); // Fetch the user's existing bid when the component mounts
  }, [idauction]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/data/articles/`);
      const jsonData = await response.json();
      const filteredData = jsonData.filter(
        (article) => article.auction_id == idauction
      );
      setArticles(filteredData);

      // Initialize bid amounts with default values of 0
      const initialBidAmounts = {};
      filteredData.forEach((article) => {
        initialBidAmounts[article.article_id] = 0;
      });
      setBidAmounts(initialBidAmounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchExistingBid = async () => {
    try {
      // Fetch the user's existing bid by their user ID and auction ID
      const response = await fetch(
        `http://localhost:3002/api/get-existing-bid/${userid}/${idauction}`
      );

      if (response.ok) {
        const existingBidData = await response.json();
        // Populate the state with the existing bid data
        setExistingBid(existingBidData);
        setBidPrice(existingBidData.price);

        // Fetch collections associated with the existing bid
        const collectionsResponse = await fetch(
          `http://localhost:3002/api/get-collections/${existingBidData.bid_id}`
        );

        if (collectionsResponse.ok) {
          const collectionsData = await collectionsResponse.json();
          // Initialize bid amounts with units from collections
          const initialBidAmounts = {};
          collectionsData.forEach((collection) => {
            initialBidAmounts[collection.collection_id] = collection.units;
          });
          setBidAmounts(initialBidAmounts);
        }
      }
    } catch (error) {
      console.error("Error fetching existing bid:", error);
    }
  };

  const handleBidChange = (event, articleId) => {
    const amount = event.target.value;
    setBidAmounts((prevBidAmounts) => ({
      ...prevBidAmounts,
      [articleId]: amount,
    }));
  };

  const handlePriceChange = (event) => {
    const price = event.target.value;
    setBidPrice(price);
  };

  const handleFormSubmit = async () => {
    try {
      let bidId;

      if (existingBid) {
        // If an existing bid exists, update the bid
        const updateBidResponse = await fetch(
          `http://localhost:3002/api/update-bid/${existingBid.bid_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: bidPrice,
            }),
          }
        );

        if (updateBidResponse.ok) {
          bidId = existingBid.bid_id;
        } else {
          console.error("Error updating bid:", updateBidResponse.statusText);
        }
      } else {
        // If there's no existing bid, create a new bid
        const bidResponse = await fetch(
          "http://localhost:3002/api/create-bid",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              auction_id: idauction,
              bidder_id: userid,
              price: bidPrice,
            }),
          }
        );

        if (bidResponse.ok) {
          const newBid = await bidResponse.json();
          bidId = newBid.bid_id;
        } else {
          console.error("Error creating bid:", bidResponse.statusText);
        }
      }

      // Step 2: Create or update entries in the `collections` table for each article
      for (const articleId in bidAmounts) {
        const units = bidAmounts[articleId];

        // Determine whether to create a new collection or update an existing one
        if (existingBid) {
          // Update the existing collection
          await fetch(
            `http://localhost:3002/api/update-collection/${existingBid.bid_id}/${articleId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                units: units,
              }),
            }
          );
        } else {
          // Create a new collection
          await fetch("http://localhost:3002/api/create-collection", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              collection_id: articleId,
              bid_id: bidId,
              units: units,
            }),
          });
        }
      }

      // Optionally, you can perform any other actions here after the bid is placed.
    } catch (error) {
      console.error("Error creating/updating bid:", error);
    }
    onBackClick();
  };

  return (
    <div className={styles.bidFormContainer}>
      <h2 className={styles.yourCollection}>Your collection</h2>
      <div className={styles.allArticlesC}>
        {articles.map((article) => (
          <div key={article.article_id} className={styles.oneArticle}>
            <h3 className={styles.articleName}>{article.title}</h3>
            <TextField
              className={styles.inputoutlined}
              sx={{ width: 109 }}
              color="primary"
              variant="outlined"
              type="number"
              label="Amount"
              placeholder="Amount"
              size="small"
              margin="none"
              value={bidAmounts[article.article_id]}
              onChange={(event) => handleBidChange(event, article.article_id)}
            />
            <div className={styles.limitParent}>
              <h4 className={styles.articleName}>Limit:</h4>
              <h4 className={styles.articleName}>{article.units} entities</h4>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.oneArticle}>
        <h3 className={styles.articleName}>Your bidding price:</h3>
        <TextField
          className={styles.inputoutlined}
          color="primary"
          variant="outlined"
          type="number"
          label="Price"
          placeholder="Enter your bidding price"
          size="small"
          margin="none"
          value={bidPrice}
          onChange={handlePriceChange}
        />
      </div>
      <div className={styles.buttonParent}>
        <button className={styles.button} onClick={onBackClick}>
          <div className={styles.back}>Back</div>
        </button>
        <button className={styles.button1} onClick={handleFormSubmit}>
          <div className={styles.back}>Confirm</div>
        </button>
      </div>
    </div>
  );
};

export default FormContainer;
