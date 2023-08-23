import Row1 from "../components/Row1";
import styles from "./Market.module.css";
import NavBar1 from "../components/NavBar1";

const Market = () => {
  return (
    <div className={styles.market}>
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
          <div className={styles.combobid}>Market</div>
        </div>
        <section className>
          <Row1 />
        </section>
      </main>
    </div>
  );
};

export default Market;
