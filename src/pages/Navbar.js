import LogoContainer from "../components/LogoContainer";
import NavbarLinks from "../components/NavbarLinks";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logoParent}>
        <LogoContainer
          logoContainerWidth="197px"
          logoContainerHeight="102px"
          logo="/logocomboauction-11@2x.png"
        />
        <NavbarLinks
          navbarLinksWidth="812px"
          navbarLinksPadding="unset"
          navbarLinksBoxSizing="unset"
        />
      </div>
    </div>
  );
};

export default Navbar;
