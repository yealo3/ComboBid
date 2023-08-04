import Row1 from "../components/Row1";
import styles from "./Desktop3.module.css";
const Desktop3 = () => {
  return (
    <div className={styles.desktop3}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer} id="logo">
          <img
            className={styles.logoIcon}
            alt=""
            src="/logocomboauction-1@2x.png"
          />
          <div className={styles.combobid}>ComboBid</div>
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.navbarLinks}>
            <div className={styles.home}>Home</div>
            <div className={styles.home}>Market</div>
            <div className={styles.home}>My Auctions</div>
            <div className={styles.home}>my bids</div>
            <div className={styles.home}>Profile</div>
            <div className={styles.button}>
              <div className={styles.home}>{`sing out `}</div>
            </div>
          </div>
          <button className={styles.button1} />
        </div>
      </nav>
      <main className={styles.mainContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.combobid}>Market</div>
        </div>
        <section className>
       
            <Row1 />

        
        </section>
      </main>
    </div>
  );
};

export default Desktop3;
