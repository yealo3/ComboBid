import Header from "../components/Header";

import BiddersListContainer from "../components/BiddersListContainer";
import WinnersListContainer from "../components/WinnersListContainer";
import Row from "../components/Row";
import styles from "./Desktop2.module.css";
const Desktop2 = () => {
  return (
    <div className={styles.desktop2}>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.auciton}>Auciton</div>
        </div>
        <section className={styles.mainContainer}>
          <div className={styles.articelSetContainer}>
            <h2 className={styles.aucitonName}>Auciton name</h2>
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

export default Desktop2;
