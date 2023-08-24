import BiddersListContainer from "../components/BiddersListContainer";
import WinnersListContainer from "../components/WinnersListContainer";
import Row from "../components/Row";
import NavBar1 from "../components/NavBar1";
import styles from "./AuctionDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AuctionDetails = () => {
  const params = useParams();
  const auctionId = params.auctionId;
  const [auctionDetails, setAuctionDetails] = useState(null);
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/data/auctions/${auctionId}` // Change userId to username
        );
        const data = await response.json();
        setAuctionDetails(data);
      } catch (error) {
        console.error("Error fetching auction details:", error);
      }
    };

    fetchAuctionDetails();
  }, [auctionId]);

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
            {auctionDetails && (
              <h2 className={styles.aucitonName}>{auctionDetails.title}</h2>
            )}
            <Row auctionId={auctionId} />
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
