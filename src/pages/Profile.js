import NavBar1 from "../components/NavBar1";
import AccountBox from "../components/AccountBox";
import styles from "./Profile.module.css";
import ProtectedRoute from "../components/ProtectedRoute";
const Profile = () => {
  return (
    <ProtectedRoute
      element={
        <div className={styles.profile}>
          <NavBar1 />
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
