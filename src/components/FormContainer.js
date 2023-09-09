import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useAuth } from "./AuthContext";
import styles from "./FormContainer.module.css";

const FormContainer = ({ onBackClick, idauction }) => {
  const { userid } = useAuth(); // Assuming you have a way to get the user ID
  const [articles, setArticles] = useState([]);
  const [bidData, setBidData] = useState({
    bidPrice: 0,
    bidAmounts: {},
    existingBid: null,
  });

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

      // Update the bidData state
      setBidData((prevBidData) => ({
        ...prevBidData,
        bidAmounts: initialBidAmounts,
      }));
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
        // Update the bidData state
        setBidData((prevBidData) => ({
          ...prevBidData,
          existingBid: existingBidData,
          bidPrice: existingBidData.price,
          bid_id: existingBidData.bid_id,
        }));

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

          // Update the bidData state
          setBidData((prevBidData) => ({
            ...prevBidData,
            bidAmounts: initialBidAmounts,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching existing bid:", error);
    }
  };

  const handleBidChange = (event, articleId) => {
    const amount = event.target.value;

    // Fetch the article corresponding to the articleId
    const article = articles.find((a) => a.article_id === articleId);

    // Check if the amount is greater than or equal to 0 and less than or equal to the article's units
    if (amount >= 0 && amount <= article.units) {
      // Update the bidData state for bidAmounts
      setBidData((prevBidData) => ({
        ...prevBidData,
        bidAmounts: {
          ...prevBidData.bidAmounts,
          [articleId]: amount,
        },
      }));
    }
  };

  const handlePriceChange = (event) => {
    const price = event.target.value;

    // Check if the price is greater than 0 before updating the state
    if (price > 0) {
      // Update the bidData state for bidPrice
      setBidData((prevBidData) => ({
        ...prevBidData,
        bidPrice: price,
      }));
    }
  };

  const handleFormSubmit = async () => {
    try {
      // Construct the request body
      const requestBody = {
        auction_id: idauction,
        bidder_id: userid,
        price: bidData.bidPrice,
        collections: [],
      };

      for (const articleId in bidData.bidAmounts) {
        const units = bidData.bidAmounts[articleId];
        requestBody.collections.push({
          collection_id: articleId,
          units: units,
        });
      }

      // Make a request to the new API endpoint to create or update bid and collections
      const response = await fetch(
        "http://localhost:3002/api/create-or-update-bid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        // Optionally, you can handle success here
        console.log("Bid and collections created/updated successfully");
      } else {
        console.error(
          "Error creating/updating bid and collections:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating/updating bid and collections:", error);
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
              value={bidData.bidAmounts[article.article_id]}
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
          value={bidData.bidPrice}
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
