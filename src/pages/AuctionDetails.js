import BiddersListContainer from "../components/BiddersListContainer";
import WinnersListContainer from "../components/WinnersListContainer";
import Row from "../components/Row";
import { useAuth } from "../components/AuthContext";
import FormContainer from "../components/FormContainer";
import ProtectedRoute from "../components/ProtectedRoute";
import NavBar1 from "../components/NavBar1";
import styles from "./AuctionDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuctionTimer from "../components/AuctionTimer";

const AuctionDetails = () => {
  const { userid } = useAuth();
  const params = useParams();
  const auctionId = params.auctionId;
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const url = `http://localhost:3002/api/data/auctions/${auctionId}`;
        console.log("Fetching from:", url);

        const response = await axios.get(url);
        console.log("Full response:", response);
        setAuctionDetails(response.data);
      } catch (error) {
        console.error("Error fetching auction details:", error);
      }
    };

    fetchAuctionDetails();
  }, [auctionId]);

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the modal visibility
  };

  // Calculate the current time
  const currentTime = new Date().toISOString();
  const isAuctionActive =
    auctionDetails &&
    currentTime >= auctionDetails.start_time &&
    currentTime <= auctionDetails.end_time;
  return (
    <ProtectedRoute
      element={
        <div className={styles.auctiondetails}>
          <NavBar1 />
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

                {auctionDetails && userid !== auctionDetails.auctioneer_id && (
                  <button
                    className={styles.button}
                    onClick={toggleForm}
                    // Add a condition to check if the current time is within the auction time range
                    style={{
                      display:
                        currentTime >= auctionDetails.start_time &&
                        currentTime <= auctionDetails.end_time
                          ? "block"
                          : "none",
                    }}
                  >
                    <div className={styles.bidOn}>Bid on</div>
                  </button>
                )}
              </div>
              {showForm && (
                <div className={styles.modalOverlay}>
                  <FormContainer
                    onBackClick={toggleForm}
                    idauction={auctionId}
                  />
                </div>
              )}
            </section>

            <section className={styles.lists}>
              <BiddersListContainer auctionId={auctionId} />

              <WinnersListContainer
                auctionId={auctionId}
                isAuctionActive={isAuctionActive}
              />
              {auctionDetails && (
                <AuctionTimer
                  startTime={auctionDetails.start_time}
                  endTime={auctionDetails.end_time}
                />
              )}
            </section>
          </main>
        </div>
      }
    />
  );
};

export default AuctionDetails;
