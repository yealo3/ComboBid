import NavBar1 from "../components/NavBar1";
import MyAuctionsContainer from "../components/MyAuctionsContainer";
import styles from "./MyAuctions.module.css";
import ProtectedRoute from "../components/ProtectedRoute";
const MyAuctions = () => {
  return (
    <ProtectedRoute
      element={
        <div className={styles.myAuctions}>
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
              <div className={styles.myAuctions1}>My auctions</div>
            </div>
            <MyAuctionsContainer />
          </main>
        </div>
      }
    />
  );
};

export default MyAuctions;
