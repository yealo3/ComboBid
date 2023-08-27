import { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar1.module.css";
import { useAuth } from "../components/AuthContext";

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
  const handleLogoutClick = () => {
    logOut(); // Call the logOut function when the button is clicked
  };
  const { loggedIn, logOut } = useAuth();
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
            to="/Market"
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
            My bids
          </Link>
          <Link
            className={styles.home}
            to="/my-articles"
            target={myBidsTarget}
            style={myBidsStyle}
          >
            My articles
          </Link>
          <Link
            className={styles.home}
            to="/profile"
            target={profileTarget}
            style={profileStyle}
          >
            Profile
          </Link>
          {loggedIn && (
            <div className={styles.button} onClick={handleLogoutClick}>
              <div className={styles.singOut}>Sign out</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar1;
