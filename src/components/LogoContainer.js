import { memo, useMemo } from "react";
import styles from "./LogoContainer.module.css";
const LogoContainer = memo(
  ({ logoContainerWidth, logoContainerHeight, logo }) => {
    const logoContainerStyle = useMemo(() => {
      return {
        width: logoContainerWidth,
        height: logoContainerHeight,
      };
    }, [logoContainerWidth, logoContainerHeight]);

    return (
      <div
        className={styles.logoContainer}
        id="logo"
        style={logoContainerStyle}
      >
        <img className={styles.logoIcon} alt="" src={logo} />
        <div className={styles.combobid}>ComboBid</div>
      </div>
    );
  }
);

export default LogoContainer;
