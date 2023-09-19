import React, { useState, useEffect } from "react";
import AuctionContainer from "./AuctionContainer";
import styles from "./Row1.module.css";

const Row1 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/auctions");
      const jsonData = await response.json();
      setData(jsonData);
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

export default Row1;
