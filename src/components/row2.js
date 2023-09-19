import React, { useState, useEffect } from "react";
import BidContainer from "./BidContainer";
import styles from "./Row1.module.css";
import { useAuth } from "./AuthContext";

const row2 = () => {
  const { userid } = useAuth();
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  console.log("asdfasd+" + userid);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/data/bids/${userid}`
      );
      const jsonData = await response.json();
      setBids(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderBids = () => {
    return bids.map((bid) => <BidContainer key={bid.bid_id} bid={bid} />);
  };

  return <div className={styles.gridContainer}>{renderBids()}</div>;
};

export default row2;
