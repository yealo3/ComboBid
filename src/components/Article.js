import React from "react";
import styles from "./Article.module.css";

const Article = ({ article }) => {
  const { title, collection_id, units, description } = article;

  return (
    <div className={styles.article}>
      <img
        className={styles.articleChild}
        alt=""
        src={"rectangle14.png"}
      />
      <div className={styles.articleNameParent}>
        <h3 className={styles.articleName}>{title}</h3>
        <h4 className={styles.entitiesNumber}>{units} units</h4>
      </div>
    </div>
  );
};

export default Article;
