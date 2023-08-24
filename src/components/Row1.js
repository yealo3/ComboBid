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
    const rows = [];
    let row = [];

    for (let i = 0; i < data.length; i++) {
      const auction = data[i];
      const auctionComponent = (
        <AuctionContainer key={auction.auction_id} auction={auction} />
      );
      row.push(auctionComponent);

      if (row.length === 3 || i === data.length - 1) {
        rows.push(
          <div className={styles.row} key={i}>
            {row}
          </div>
        );
        row = [];
      }
    }

    return rows;
  };

  return <div>{renderAuctions()}</div>;
};

export default Row1;
