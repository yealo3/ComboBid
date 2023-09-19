import Row1 from "../components/Row1";
import styles from "./Market.module.css";
import NavBar1 from "../components/NavBar1";

const Market = () => {
  return (
    <div className={styles.market}>
      <NavBar1 />
      <main className={styles.mainContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.combobid}>Market</div>
        </div>
        <section>
          <Row1 />
        </section>
      </main>
    </div>
  );
};

export default Market;
