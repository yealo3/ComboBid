import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { useAuth } from "./AuthContext";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import styles from "./AuctionDetailsFormContainer.module.css";

const AuctionDetailsFormContainer = ({ onBackClick }) => {
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [auctionTitleValue, setAuctionTitleValue] = useState("");

  const { userid } = useAuth(); // Assuming you have a userid from the AuthContext
  const [startingTimeDateTimePickerValue, setStartingTimeDateTimePickerValue] =
    useState(null);
  const [endingTimeDateTimePickerValue, setEndingTimeDateTimePickerValue] =
    useState(null);
  const [selectArticlesAnchorEl, setSelectArticlesAnchorEl] = useState(null);
  const [articles, setArticles] = useState([]);
  const selectArticlesOpen = Boolean(selectArticlesAnchorEl);

  useEffect(() => {
    // Fetch articles from the backend
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/data/selectarticles?auctioneer_id=${userid}`
      );
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleSelectArticlesMenuItemClick = (articleId) => {
    if (selectedArticles.includes(articleId)) {
      setSelectedArticles(selectedArticles.filter((id) => id !== articleId));
    } else {
      setSelectedArticles([...selectedArticles, articleId]);
    }
    // Don't close the menu here
  };

  const handleSelectArticlesClick = (event) => {
    setSelectArticlesAnchorEl(event.currentTarget);
  };

  const handleSelectArticlesClose = () => {
    setSelectArticlesAnchorEl(null);
  };

  const handleFormSubmit = async () => {
    const formData = {
      title: auctionTitleValue,
      startingTime: startingTimeDateTimePickerValue,
      endingTime: endingTimeDateTimePickerValue,
      description: descriptionValue,
      auctioneer_id: userid,
      selectedArticles: selectedArticles, // Include the selectedArticles property
    };

    try {
      const response = await fetch("http://localhost:3002/api/postauctions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newAuctionId = await response.json();
        console.log("Auction created with ID:", newAuctionId);
      } else {
        console.error("Error creating auction:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating auction:", error);
    }
    onBackClick();
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.auctionDetailsFormContainer}>
        <div className={styles.auctionDetails}>
          <h2 className={styles.auctionDetailsForm}>Auction Details Form</h2>
          <div className={styles.provideTheAuction}>
            Provide the auction informations
          </div>
          <TextField
            className={styles.auctionTitle}
            sx={{ width: 460 }}
            value={auctionTitleValue}
            onChange={(e) => setAuctionTitleValue(e.target.value)}
            color="primary"
            variant="outlined"
            type="text"
            label="Auction Title"
            placeholder="Choose a title"
            size="medium"
            margin="none"
          />
          <div className={styles.period}>
            <div>
              <DateTimePicker
                label="Starting time"
                value={startingTimeDateTimePickerValue}
                onChange={(newValue) => {
                  setStartingTimeDateTimePickerValue(newValue);
                }}
                slotProps={{
                  textField: {
                    variant: "standard",
                    size: "medium",
                    color: "primary",
                  },
                }}
              />
            </div>
            <div>
              <DateTimePicker
                label="Ending time"
                value={endingTimeDateTimePickerValue}
                onChange={(newValue) => {
                  setEndingTimeDateTimePickerValue(newValue);
                }}
                slotProps={{
                  textField: {
                    variant: "standard",
                    size: "medium",
                    color: "primary",
                  },
                }}
              />
            </div>
          </div>

          <div>
            <Button
              id="button-SELECT ARTICLES"
              aria-controls="menu-SELECT ARTICLES"
              aria-haspopup="true"
              aria-expanded={selectArticlesOpen ? "true" : undefined}
              onClick={handleSelectArticlesClick}
              color="primary"
            >
              SELECT ARTICLES
            </Button>
            <Menu
              anchorEl={selectArticlesAnchorEl}
              open={selectArticlesOpen}
              onClose={handleSelectArticlesClose}
            >
              {articles.map((article) => (
                <MenuItem key={article.article_id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedArticles.includes(article.article_id)}
                        onChange={() =>
                          handleSelectArticlesMenuItemClick(article.article_id)
                        }
                      />
                    }
                    label={article.title}
                  />
                </MenuItem>
              ))}
            </Menu>
          </div>
          <TextField
            sx={{ width: 460 }}
            color="primary"
            variant="outlined"
            multiline
            rows={7}
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            label="Description"
            placeholder="Enter description"
            margin="none"
          />
          <div className={styles.buttonParent}>
            <button className={styles.button}>
              <div className={styles.back} onClick={onBackClick}>
                Back
              </div>
            </button>
            <button className={styles.submit} onClick={handleFormSubmit}>
              <div className={styles.back}>Submit</div>
            </button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default AuctionDetailsFormContainer;
