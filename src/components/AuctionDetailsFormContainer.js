import { useState } from "react";
import { TextField, Icon, Button, Menu, MenuItem } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from "./AuctionDetailsFormContainer.module.css";
const AuctionDetailsFormContainer = () => {
  const [startingTimeDateTimePickerValue, setStartingTimeDateTimePickerValue] =
    useState(null);
  const [endingTimeDateTimePickerValue, setEndingTimeDateTimePickerValue] =
    useState(null);
  const [selectArticlesAnchorEl, setSelectArticlesAnchorEl] = useState(null);
  const [selectArticlesSelectedIndex, setSelectArticlesSelectedIndex] =
    useState(-1);
  const selectArticlesOpen = Boolean(selectArticlesAnchorEl);
  const handleSelectArticlesClick = (event) => {
    setSelectArticlesAnchorEl(event.currentTarget);
  };
  const handleSelectArticlesMenuItemClick = (index) => {
    setSelectArticlesSelectedIndex(index);
    setSelectArticlesAnchorEl(null);
  };
  const handleSelectArticlesClose = () => {
    setSelectArticlesAnchorEl(null);
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
            color="primary"
            variant="outlined"
            type="text"
            label="Auction Title"
            placeholder="choose a title"
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
              <MenuItem
                selected={selectArticlesSelectedIndex === 0}
                onClick={() => handleSelectArticlesMenuItemClick(0)}
              >
                article1
              </MenuItem>
              <MenuItem
                selected={selectArticlesSelectedIndex === 1}
                onClick={() => handleSelectArticlesMenuItemClick(1)}
              >
                article2
              </MenuItem>
              <MenuItem
                selected={selectArticlesSelectedIndex === 2}
                onClick={() => handleSelectArticlesMenuItemClick(2)}
              >
                article3
              </MenuItem>
            </Menu>
          </div>
          <TextField
            sx={{ width: 460 }}
            color="primary"
            variant="outlined"
            multiline
            rows={7}
            maxRows={10}
            label="Description"
            placeholder="Enter description"
            margin="none"
          />
          <div className={styles.buttonParent}>
            <button className={styles.button}>
              <div className={styles.back}>Back</div>
            </button>
            <button className={styles.submit}>
              <div className={styles.back}>Submit</div>
            </button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default AuctionDetailsFormContainer;
