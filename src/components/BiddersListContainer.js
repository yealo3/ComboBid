import styles from "./BiddersListContainer.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const BiddersListContainer = ({ auctionId }) => {
  const [bidders, setBidders] = useState([]);
  const [hoveredBidderId, setHoveredBidderId] = useState(null); // Track the bidder whose name is being hovered over
  const [collections, setCollections] = useState([]);

  const fetchBidders = () => {
    // Fetch bidders for the specified auction
    axios
      .get(`http://localhost:3002/api/bidders/${auctionId}`)
      .then((response) => {
        setBidders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bidders:", error);
      });
  };

  const fetchCollections = () => {
    if (hoveredBidderId !== null) {
      axios
        .get(
          `http://localhost:3002/api/collections/${hoveredBidderId}/${auctionId}`
        )
        .then((response) => {
          setCollections(response.data);
        })
        .catch((error) => {
          console.error("Error fetching collections:", error);
        });
    } else {
      // Clear collections when no bidder is hovered over
      setCollections([]);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchBidders();
    fetchCollections();

    // Set up an interval to refresh the data every 2 seconds
    const refreshInterval = setInterval(() => {
      fetchBidders();
      fetchCollections();
    }, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(refreshInterval);
  }, [auctionId, hoveredBidderId]);

  return (
    <div className={styles.biddersListContainer}>
      <Typography variant="h5">Bidders List</Typography>

      <List>
        {bidders.map((bidder, index) => (
          <div
            key={index}
            className={styles.biddersListItem}
            onMouseEnter={() => setHoveredBidderId(bidder.user_id)} // Set the hovered bidder's ID
            onMouseLeave={() => setHoveredBidderId(null)} // Clear the hovered bidder's ID
          >
            {hoveredBidderId === bidder.user_id && (
              <div className={styles.collectionBubble}>
                <Typography variant="h6">Collections</Typography>
                <List>
                  {collections.map((collection, idx) => (
                    <ListItem key={idx} className={styles.collectionItem}>
                      <ListItemText
                        primary={`Title: ${collection.title}`}
                        secondary={`Units: ${collection.units}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            )}
            <ListItemText
              primary={`${bidder.family_name}, ${bidder.name}`}
              secondary={`Bidding Time: ${bidder.put_time}, Price: $${bidder.price}`}
            />
          </div>
        ))}
      </List>
    </div>
  );
};

export default BiddersListContainer;
