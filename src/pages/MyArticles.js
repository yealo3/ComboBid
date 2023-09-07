import NavBar1 from "../components/NavBar1";
import MyArticlesContainer from "../components/MyArticlesContainer";
import styles from "./MyArticles.module.css";
import ProtectedRoute from "../components/ProtectedRoute";
const MyArticles = () => {
  return (
    <ProtectedRoute
      element={
        <div className={styles.myArticles}>
          <NavBar1 />
          <main className={styles.mainContainer}>
            <div className={styles.headingContainer}>
              <div className={styles.myArticles1}>My articles</div>
            </div>
            <MyArticlesContainer />
          </main>
        </div>
      }
    />
  );
};

export default MyArticles;
