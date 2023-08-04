import { memo } from "react";
import Row from "./Row";
import styles from "./ArticlesContainer.module.css";
const ArticlesContainer = memo(() => {
  return (
    <div className={styles.articlesContainer}>
      <Row />
    </div>
  );
});

export default ArticlesContainer;
