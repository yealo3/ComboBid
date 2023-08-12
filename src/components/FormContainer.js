import { TextField } from "@mui/material";
import styles from "./FormContainer.module.css";
const FormContainer = () => {
  return (
    <div className={styles.bidFormContainer}>
      <h2 className={styles.yourCollection}>Your collection</h2>
      <div className={styles.allArticlesC}>
        <div className={styles.oneArticle}>
          <h3 className={styles.articleName}>article-name</h3>
          <TextField
            className={styles.inputoutlined}
            sx={{ width: 109 }}
            color="primary"
            variant="outlined"
            defaultValue="Input"
            type="number"
            label="Amount"
            placeholder="Amount"
            size="small"
            margin="none"
          />
          <div className={styles.limitParent}>
            <h4 className={styles.articleName}>Limit:</h4>
            <h4 className={styles.articleName}>entities-number</h4>
          </div>
        </div>
        <div className={styles.oneArticle}>
          <h3 className={styles.articleName}>article-name</h3>
          <TextField
            className={styles.inputoutlined}
            sx={{ width: 109 }}
            color="primary"
            variant="outlined"
            defaultValue="Input"
            type="number"
            label="Amount"
            placeholder="Amount"
            size="small"
            margin="none"
          />
          <div className={styles.limitParent}>
            <h4 className={styles.articleName}>Limit:</h4>
            <h4 className={styles.articleName}>entities-number</h4>
          </div>
        </div>
        <div className={styles.oneArticle}>
          <h3 className={styles.articleName}>article-name</h3>
          <TextField
            className={styles.inputoutlined}
            sx={{ width: 109 }}
            color="primary"
            variant="outlined"
            defaultValue="Input"
            type="number"
            label="Amount"
            placeholder="Amount"
            size="small"
            margin="none"
          />
          <div className={styles.limitParent}>
            <h4 className={styles.articleName}>Limit:</h4>
            <h4 className={styles.articleName}>entities-number</h4>
          </div>
        </div>
        <div className={styles.oneArticle}>
          <h3 className={styles.articleName}>article-name</h3>
          <TextField
            className={styles.inputoutlined}
            sx={{ width: 109 }}
            color="primary"
            variant="outlined"
            defaultValue="Input"
            type="number"
            label="Amount"
            placeholder="Amount"
            size="small"
            margin="none"
          />
          <div className={styles.limitParent}>
            <h4 className={styles.articleName}>Limit:</h4>
            <h4 className={styles.articleName}>entities-number</h4>
          </div>
        </div>
      </div>
      <div className={styles.oneArticle}>
        <h3 className={styles.articleName}>Your bidding price:</h3>
        <TextField
          className={styles.inputoutlined}
          color="primary"
          variant="outlined"
          defaultValue="Input"
          type="number"
          label="Price"
          placeholder="Enter your bidding price "
          size="small"
          margin="none"
        />
      </div>
      <div className={styles.buttonParent}>
        <button className={styles.button}>
          <div className={styles.back}>Back</div>
        </button>
        <button className={styles.button1}>
          <div className={styles.back}>Confirm</div>
        </button>
      </div>
    </div>
  );
};

export default FormContainer;
