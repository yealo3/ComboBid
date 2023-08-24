import NavBar1 from "../components/NavBar1";
import AuctionDetailsFormContainer from "../components/AuctionDetailsFormContainer";
import styles from "./AuctionAssign.module.css";
import ProtectedRoute from "../components/ProtectedRoute";
const AuctionAssign = () => {
  return (
    <ProtectedRoute
      element={
        <div className={styles.auctionAssign}>
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
            <main className={styles.formContainer}>
              <AuctionDetailsFormContainer />
            </main>
          </main>
        </div>
      }
    />
  );
};

export default AuctionAssign;
