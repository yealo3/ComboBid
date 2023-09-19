import NavBar1 from "../components/NavBar1";
import Row2 from "../components/row2.js";
import styles from "./MyBids.module.css";
import ProtectedRoute from "../components/ProtectedRoute";
const MyBids = () => {
  return (
    <ProtectedRoute
      element={
        <div className={styles.myBids}>
          <NavBar1 />
          <main className={styles.mainContainer}>
            <div className={styles.headingContainer}>
              <div className={styles.myBids1}>My bids</div>
            </div>
            <section>
              <Row2 />
            </section>
          </main>
        </div>
      }
    />
  );
};

export default MyBids;
