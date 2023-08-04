import LogoContainer from "./LogoContainer";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <nav className={styles.navbar}>
      <LogoContainer logo="/logocomboauction-1@2x.png" />
      <div className={styles.linksContainer}>
        <div className={styles.navbarLinks}>
          <div className={styles.home}>Home</div>
          <div className={styles.home}>Market</div>
          <div className={styles.home}>My Auctions</div>
          <div className={styles.home}>my bids</div>
          <div className={styles.home}>Profile</div>
          <button className={styles.button}>
            <div className={styles.singOut}>{`sing out `}</div>
          </button>
        </div>
        <button className={styles.button1} />
      </div>
    </nav>
  );
};

export default Header;
