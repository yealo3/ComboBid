import React, { useState, useEffect } from "react";
import ArticleContainer from "./Article";
import { useAuth } from "./AuthContext";
import styles from "./MyArticlesContainer.module.css";
import ArticleDetailsFormContainer from "./ArticleDetailsFormContainer";

const MyArticlesContainer = ({ auctionId }) => {
  const { userid } = useAuth();
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to control modal visibility

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
  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the modal visibility
  };

  return (
    <div>
      <div className={styles.gridContainer}>{renderArticles()}</div>
      {showForm && (
        <div className={styles.modalOverlay}>
          <ArticleDetailsFormContainer onBackClick={toggleForm} />
        </div>
      )}
      <button className={styles.button} onClick={toggleForm}>
        Add an article
      </button>
    </div>
  );
};

export default MyArticlesContainer;
