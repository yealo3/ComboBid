import React, { useState, useEffect } from "react";
import ArticleContainer from "./Article";
import { useAuth } from "./AuthContext";
import styles from "./MyArticlesContainer.module.css";

const MyArticlesContainer = ({ auctionId }) => {
  const { userid } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [auctionId]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/data/myarticles/${userid}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderArticles = () => {
    return data.map((article) => (
      <ArticleContainer key={article.article_id} article={article} />
    ));
  };

  return <div className={styles.gridContainer}>{renderArticles()}</div>;
};

export default MyArticlesContainer;
