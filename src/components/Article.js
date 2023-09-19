import React from "react";
import styles from "./Article.module.css";

const Article = ({ article }) => {
  const { title, auction_id, units, image } = article;

  // Create a data URL for the image (assuming it's in JPEG format)
  const imageUrl = image
    ? `data:image/jpeg;base64,${image.toString("base64")}`
    : "/rectangle-14@2x.png"; // Use a default image if no image data is available

  return (
    <div className={`${styles.article} `}>
      <img className={styles.articleChild} alt="" src={imageUrl} />
      <div className={styles.articleNameParent}>
        <h3 className={styles.articleName}>{title}</h3>
        <h4 className={styles.entitiesNumber}>{units} units</h4>
      </div>
    </div>
  );
};

export default Article;
