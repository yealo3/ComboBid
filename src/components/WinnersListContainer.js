// WinnersListContainer.js
import styles from "./BiddersListContainer.module.css"; // Make sure the path is correct

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const WinnersListContainer = ({ auctionId, isAuctionActive }) => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    // Fetch winners' data from the Flask server
    // Modify the URL to include the auctionId
    const fetchWinnersData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/winners/${auctionId}`
        );
        setWinners(response.data);
      } catch (error) {
        console.error("Error fetching winners' data:", error);
      }
    };

    // Call the fetchWinnersData function to fetch data when the component mounts
    fetchWinnersData();

    // You can also set up an interval to periodically fetch updated winners' data
    const intervalId = setInterval(fetchWinnersData, 1000); // Fetch data every 10 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [auctionId]);

  return (
    <div className={styles.biddersListContainer}>
      <Typography variant="h5">
        {isAuctionActive ? "Temporary Winners List" : "Winners List"}
      </Typography>
      {winners.map((winner, index) => (
        <div key={index} className={styles.biddersListItem}>
          <ListItemText
            primary={`${winner.family_name}, ${winner.name}`}
            secondary={`Bidding Time: ${winner.put_time}, Price: $${winner.price}`}
          />
        </div>
      ))}
    </div>
  );
};

export default WinnersListContainer;
