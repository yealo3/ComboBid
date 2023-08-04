import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Desktop1.module.css";
const Desktop1 = () => {
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate("/desktop-3");
  }, [navigate]);

  return (
    <div className={styles.desktop1}>
      <section className={styles.section}>
        <div className={styles.logoContainer} id="logo">
          <img
            className={styles.logoIcon}
            alt=""
            src="/logocomboauction-1@2x.png"
          />
          <div className={styles.combobid}>ComboBid</div>
        </div>
        <div className={styles.container}>
          <div className={styles.combobid}>Welcome to ComboBid!</div>
          <div className={styles.theUltimateCombinatorial}>
            The Ultimate Combinatorial Auction Platform!
          </div>
          <img
            className={styles.auctionImageIcon}
            alt=""
            src="/auction-image@2x.png"
          />
        </div>
      </section>
      <section className={styles.intro}>
        <div className={styles.container1}>
          <div className={styles.discoverThePower}>
            Discover the Power of Combinatorial Auctions
          </div>
          <div className={styles.revolutionizeYourAuction}>
            Revolutionize your auction experience with our powerful and
            intuitive web app. Start Exploring!
          </div>
          <button className={styles.button} onClick={onButtonClick}>
            <div className={styles.getStarted}>Get Started</div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Desktop1;
