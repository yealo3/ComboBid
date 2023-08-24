import NavBar1 from "../components/NavBar1";
import MyBidsContainer from "../components/MyBidsContainer";
import styles from "./MyBids.module.css";
import ProtectedRoute from "../components/ProtectedRoute";
const MyBids = () => {
  return (
    <ProtectedRoute
      element={
        <div className={styles.myBids}>
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
              <div className={styles.myBids1}>My bids</div>
            </div>
            <MyBidsContainer />
          </main>
        </div>
      }
    />
  );
};

export default MyBids;
