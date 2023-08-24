import React, { useState, useEffect } from "react";
import ArticleContainer from "./Article";
import styles from "./Row.module.css";
const Row = ({ auctionId }) => {
  // Accept auctionId as a prop
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [auctionId]); // Fetch data whenever auctionId changes

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/data/articles`);
      const jsonData = await response.json();

      // Filter articles based on collection_id matching auctionId

      const filteredData = jsonData.filter(
        (article) => article.collection_id == auctionId
      );

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderArticles = () => {
    const rows = [];
    let row = [];

    for (let i = 0; i < data.length; i++) {
      const article = data[i];
      const articleComponent = (
        <ArticleContainer key={article.article_id} article={article} />
      );
      row.push(articleComponent);

      if (row.length === 4 || i === data.length - 1) {
        rows.push(
          <div className={styles.row} key={i}>
            {row}
          </div>
        );
        row = [];
      }
    }

    return rows;
  };

  return <div>{renderArticles()}</div>;
};

export default Row;
