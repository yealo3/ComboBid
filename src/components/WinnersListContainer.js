import styles from "./WinnersListContainer.module.css";
const WinnersListContainer = () => {
  return (
    <div className={styles.winnersListContainer}>
      <div className={styles.winnersListParent}>
        <div className={styles.winnersList}>winners list</div>
        <a
          className={styles.johnEmilySarahContainer}
          href="mailto:Timsa.shirt@gmail.com"
          target="_blank"
        >
          <ul className={styles.johnEmilySarah}>
            <li className={styles.john}>John</li>
            <li className={styles.john}>Emily</li>
            <li>Sarah</li>
          </ul>
        </a>
      </div>
    </div>
  );
};

export default WinnersListContainer;
