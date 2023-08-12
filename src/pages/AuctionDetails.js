import BiddersListContainer from "../components/BiddersListContainer";
import WinnersListContainer from "../components/WinnersListContainer";
import Row from "../components/Row";
import NavBar1 from "../components/NavBar1";
import styles from "./AuctionDetails.module.css";
const AuctionDetails = () => {
  return (
    <div className={styles.auctiondetails}>
      <NavBar1
        navbarMargin="unset"
        homeTextDecoration="unset"
        marketTextDecoration="unset"
        myAuctionsTextDecoration="unset"
        myBidsTextDecoration="unset"
        profileTextDecoration="unset"
        button={false}
        buttonBackgroundImage={`url("/50727481@3x.png")`}
      />
      <main className={styles.mainContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.auciton}>Auction</div>
        </div>
        <section className={styles.mainContainer}>
          <div className={styles.articelSetContainer}>
            <h2 className={styles.aucitonName}>Auction name</h2>
            <Row />
            <button className={styles.button}>
              <div className={styles.bidOn}>bid on</div>
            </button>
          </div>
        </section>
        <section className={styles.lists}>
          <BiddersListContainer />
          <WinnersListContainer />
        </section>
      </main>
    </div>
  );
};

export default AuctionDetails;
