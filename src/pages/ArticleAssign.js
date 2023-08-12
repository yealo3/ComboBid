import NavBar1 from "../components/NavBar1";
import ArticleDetailsFormContainer from "../components/ArticleDetailsFormContainer";
import styles from "./ArticleAssign.module.css";
const ArticleAssign = () => {
  return (
    <div className={styles.articleAssign}>
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
        <section className={styles.formContainer}>
          <ArticleDetailsFormContainer />
        </section>
      </main>
    </div>
  );
};

export default ArticleAssign;
