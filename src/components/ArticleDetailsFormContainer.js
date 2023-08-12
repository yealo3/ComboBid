import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateRangePicker } from "@mui/x-date-pickers";
import styles from "./ArticleDetailsFormContainer.module.css";
const ArticleDetailsFormContainer = () => {
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
        />
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
  );
};

export default ArticleDetailsFormContainer;
