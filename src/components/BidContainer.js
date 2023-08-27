import React from "react";
import { Link } from "react-router-dom";
import styles from "./AuctionContainer.module.css";

const BidContainer = ({ bid }) => {
  return (
    <Link
      to={`/auction-details/${bid.auction_id}`}
      className={styles.auctionContainer}
    >
      <img
        className={styles.auctionContainerChild}
        alt=""
        src={"rectangle20.png"}
      />

      <div className={styles.aucitonNameParent}>
        <h3 className={styles.aucitonName}>{bid.auction_title}</h3>
        <h4 className={styles.startTime}>Your put time: {bid.put_time}</h4>
        <h4 className={styles.startTime}>Your estimated price: {bid.price}</h4>
      </div>
    </Link>
  );
};

export default BidContainer;
