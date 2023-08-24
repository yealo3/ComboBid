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
        <h4 className={styles.startTime}>Start Time: {auction.start_time}</h4>
        <h4 className={styles.startTime}>Period: {auction.period} days</h4>
      </div>
    </Link>
  );
});

export default AuctionContainer;
