import React, { useState, useEffect } from "react";
import ArticleContainer from "./Article";
import styles from "./Row.module.css";

const Row = ({ auctionId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [auctionId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/data/articles/`);
      const jsonData = await response.json();
      const filteredData = jsonData.filter(
        (article) => article.auction_id == auctionId
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderArticles = () => {
    return data.map((article) => (
      <ArticleContainer
        className={styles.normalpoacity}
        key={article.article_id}
        article={article}
      />
    ));
  };

  return <div className={styles.gridContainer}>{renderArticles()}</div>;
};

export default Row;
