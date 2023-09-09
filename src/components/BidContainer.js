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
        <h4 className={styles.startTime}>
          Your put time: {formatTime(bid.put_time)}
        </h4>
        <h4 className={styles.startTime}>Your estimated price: {bid.price}</h4>
      </div>
    </Link>
  );
};

export default BidContainer;
function formatTime(timeString) {
  // Convert the time string to a JavaScript Date object
  const time = new Date(timeString);

  // Format the date and time as desired (adjust this format as needed)
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return time.toLocaleDateString("en-US", options);
}
