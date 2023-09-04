import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useAuth } from "./AuthContext";
import styles from "./ArticleDetailsFormContainer.module.css";
const ArticleDetailsFormContainer = ({ onBackClick, useEffect }) => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleUnit, setArticleUnit] = useState(0);
  const [description, setDescription] = useState("");
  const { userid } = useAuth();

  const handleArticleTitleChange = (event) => {
    setArticleTitle(event.target.value);
  };

  const handleArticleUnitChange = (event) => {
    setArticleUnit(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/putarticle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: articleTitle,
          units: articleUnit,
          description,
          auctioneer_id: userid,
        }),
      });

      if (response.ok) {
        // Data successfully saved
        useEffect;
        console.log("Article details submitted successfully");
      } else {
        // Handle error response
        console.error("Failed to submit article details");
      }
    } catch (error) {
      console.error("Error submitting article details:", error);
    }
    onBackClick();
  };

  return (
    <div className={styles.articleDetailsFormContainer}>
      <div className={styles.articleDetails}>
        <h2 className={styles.articleDetailsForm}>Article Details Form</h2>
        <div className={styles.provideTheArticle}>
          Provide the article informations
        </div>
        <TextField
          className={styles.articleTitle}
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Article title"
          placeholder="choose a title"
          size="medium"
          margin="none"
          value={articleTitle}
          onChange={handleArticleTitleChange}
        />
        <TextField
          className={styles.articleTitle}
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          type="number"
          label="Article unit"
          placeholder="How many"
          size="medium"
          margin="none"
          value={articleUnit}
          onChange={handleArticleUnitChange}
        />
        <TextField
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          multiline
          rows={7}
          label="Description"
          placeholder="Enter description"
          margin="none"
          value={description}
          onChange={handleDescriptionChange}
        />

        <div className={styles.buttonParent}>
          <button className={styles.button}>
            <div className={styles.back} onClick={onBackClick}>
              Back
            </div>
          </button>
          <button className={styles.submit} onClick={handleSubmit}>
            <div className={styles.back}>Submit</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsFormContainer;
