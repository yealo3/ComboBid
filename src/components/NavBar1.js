import { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar1.module.css";
const NavBar1 = ({
  navbarMargin,
  homeTarget,
  homeTextDecoration,
  marketTarget,
  marketTextDecoration,
  myAuctionsTarget,
  myAuctionsTextDecoration,
  myBidsTarget,
  myBidsTextDecoration,
  profileTarget,
  profileTextDecoration,
  button,
  buttonBackgroundImage,
}) => {
  const navbarStyle = useMemo(() => {
    return {
      margin: navbarMargin,
    };
  }, [navbarMargin]);

  const homeStyle = useMemo(() => {
    return {
      textDecoration: homeTextDecoration,
    };
  }, [homeTextDecoration]);

  const marketStyle = useMemo(() => {
    return {
      textDecoration: marketTextDecoration,
    };
  }, [marketTextDecoration]);

  const myAuctionsStyle = useMemo(() => {
    return {
      textDecoration: myAuctionsTextDecoration,
    };
  }, [myAuctionsTextDecoration]);

  const myBidsStyle = useMemo(() => {
    return {
      textDecoration: myBidsTextDecoration,
    };
  }, [myBidsTextDecoration]);

  const profileStyle = useMemo(() => {
    return {
      textDecoration: profileTextDecoration,
    };
  }, [profileTextDecoration]);

  const buttonStyle = useMemo(() => {
    return {
      backgroundImage: buttonBackgroundImage,
    };
  }, [buttonBackgroundImage]);

  return (
    <nav className={styles.navbar} style={navbarStyle}>
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
          <Link
            className={styles.home}
            to="/"
            target={homeTarget}
            style={homeStyle}
          >
            Home
          </Link>
          <Link
            className={styles.home}
            to="/desktop-3"
            target={marketTarget}
            style={marketStyle}
          >
            Market
          </Link>
          <Link
            className={styles.home}
            to="/my-auctions"
            target={myAuctionsTarget}
            style={myAuctionsStyle}
          >
            My Auctions
          </Link>
          <Link
            className={styles.home}
            to="/my-bids"
            target={myBidsTarget}
            style={myBidsStyle}
          >
            my bids
          </Link>
          <Link
            className={styles.home}
            to="/profile"
            target={profileTarget}
            style={profileStyle}
          >
            Profile
          </Link>
          <div className={styles.button}>
            <div className={styles.singOut}>{`sing out `}</div>
          </div>
        </div>
        {!button && <button className={styles.button1} style={buttonStyle} />}
      </div>
    </nav>
  );
};

export default NavBar1;
