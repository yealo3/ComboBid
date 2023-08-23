import NavBar1 from "../components/NavBar1";
import AccountBox from "../components/AccountBox";
import styles from "./Profile.module.css";
import ProtectedRoute from "../components/ProtectedRoute";
const Profile = () => {
  return (
    <ProtectedRoute
      element={
        <div className={styles.profile}>
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
            <div className={styles.headingContainer} />
            <section className={styles.formContainer}>
              <AccountBox />
            </section>
          </main>
        </div>
      }
    />
  );
};

export default Profile;
