import styles from "./AccountBox.module.css";
const AccountBox = () => {
  return (
    <div className={styles.accountBox}>
      <h2 className={styles.accountDetails}>Account details</h2>
      <img className={styles.pfpIcon} alt="" src="/pfp.svg" />
      <div className={styles.details}>
        <div className={styles.usernameB}>
          <div className={styles.username}>{`Username: `}</div>
          <div className={styles.username}>username</div>
        </div>
        <div className={styles.usernameB}>
          <div className={styles.username}>{`Full name: `}</div>
          <div className={styles.username}>name</div>
        </div>
        <div className={styles.usernameB}>
          <div className={styles.username}>Account type:</div>
          <div className={styles.username}>type</div>
        </div>
      </div>
    </div>
  );
};

export default AccountBox;
