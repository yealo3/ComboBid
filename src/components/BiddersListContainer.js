import styles from "./BiddersListContainer.module.css";
const BiddersListContainer = () => {
  return (
    <div className={styles.biddersListContainer}>
      <div className={styles.biddersListParent}>
        <div className={styles.biddersList}>bidders list</div>
        <div className={styles.johnBiddingContainer}>
          <ul className={styles.johnBiddingTime1023Am}>
            <li className={styles.johnBidding}>
              John - Bidding Time: 10:23 AM, Price: $45
            </li>
            <li className={styles.johnBidding}>
              Emily - Bidding Time: 10:25 AM, Price: $78
            </li>
            <li className={styles.johnBidding}>
              David - Bidding Time: 10:27 AM, Price: $32
            </li>
            <li className={styles.johnBidding}>
              Sarah - Bidding Time: 10:29 AM, Price: $66
            </li>
            <li>Michael - Bidding Time: 10:31 AM, Price: $21</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BiddersListContainer;
