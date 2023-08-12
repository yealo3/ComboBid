import styles from "./MyArticlesContainer.module.css";
const MyArticlesContainer = () => {
  return (
    <section className={styles.myArticlesContainer}>
      <div className={styles.articlesContainer}>
        <div className={styles.row}>
          <div className={styles.article}>
            <img
              className={styles.articleChild}
              alt=""
              src="/rectangle-14@2x.png"
            />
            <div className={styles.articleNameParent}>
              <h3 className={styles.articleName}>article-name</h3>
              <h4 className={styles.entitiesNumber}>entities-number</h4>
            </div>
          </div>
          <div className={styles.article}>
            <img
              className={styles.articleChild}
              alt=""
              src="/rectangle-148@2x.png"
            />
            <div className={styles.articleNameParent}>
              <h3 className={styles.articleName}>article-name</h3>
              <h4 className={styles.entitiesNumber}>entities-number</h4>
            </div>
          </div>
          <div className={styles.article}>
            <img
              className={styles.articleChild}
              alt=""
              src="/rectangle-149@2x.png"
            />
            <div className={styles.articleNameParent}>
              <h3 className={styles.articleName}>article-name</h3>
              <h4 className={styles.entitiesNumber}>entities-number</h4>
            </div>
          </div>
          <div className={styles.article}>
            <img
              className={styles.articleChild}
              alt=""
              src="/rectangle-143@2x.png"
            />
            <div className={styles.articleNameParent}>
              <h3 className={styles.articleName}>article-name</h3>
              <h4 className={styles.entitiesNumber}>entities-number</h4>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.article}>
            <img
              className={styles.articleChild}
              alt=""
              src="/rectangle-144@2x.png"
            />
            <div className={styles.articleNameParent}>
              <h3 className={styles.articleName}>article-name</h3>
              <h4 className={styles.entitiesNumber}>entities-number</h4>
            </div>
          </div>
          <div className={styles.article}>
            <img
              className={styles.articleChild}
              alt=""
              src="/rectangle-1410@2x.png"
            />
            <div className={styles.articleNameParent}>
              <h3 className={styles.articleName}>article-name</h3>
              <h4 className={styles.entitiesNumber}>entities-number</h4>
            </div>
          </div>
          <div className={styles.article}>
            <img
              className={styles.articleChild}
              alt=""
              src="/rectangle-1411@2x.png"
            />
            <div className={styles.articleNameParent}>
              <h3 className={styles.articleName}>article-name</h3>
              <h4 className={styles.entitiesNumber}>entities-number</h4>
            </div>
          </div>
          <div className={styles.article}>
            <img
              className={styles.articleChild}
              alt=""
              src="/rectangle-147@2x.png"
            />
            <div className={styles.articleNameParent}>
              <h3 className={styles.articleName}>article-name</h3>
              <h4 className={styles.entitiesNumber}>entities-number</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyArticlesContainer;
