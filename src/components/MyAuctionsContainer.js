import React, { useState, useEffect } from "react";
import AuctionContainer from "./AuctionContainer";
import { useAuth } from "./AuthContext";

import styles from "./MyAuctionsContainer.module.css";

const MyAuctionsContainer = () => {
  const { userid } = useAuth(); // Change userId to userid
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/auctions");
      const jsonData = await response.json();
      const filteredData = jsonData.filter(
        (myAuctions) => myAuctions.auctioneer_id == userid
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderAuctions = () => {
    return data.map((auction) => (
      <AuctionContainer key={auction.auction_id} auction={auction} />
    ));
  };

  return <div className={styles.gridContainer}>{renderAuctions()}</div>;
};

export default MyAuctionsContainer;
