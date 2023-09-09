import { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./AuctionContainer.module.css";

const AuctionContainer = memo(({ auction }) => {
  return (
    <Link
      to={`/auction-details/${auction.auction_id}`}
      className={styles.auctionContainer}
    >
      <img
        className={styles.auctionContainerChild}
        alt=""
        src={"rectangle20.png"}
      />
      <div className={styles.aucitonNameParent}>
        <h3 className={styles.aucitonName}>{auction.title}</h3>
        <div className={styles.timeInfo}>
          <div className={styles.timeItem}>
            <h4>Start Time:</h4>
            <p>{formatTime(auction.start_time)}</p>
          </div>
          <div className={styles.timeItem}>
            <h4>End Time:</h4>
            <p>{formatTime(auction.end_time)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default AuctionContainer;

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
