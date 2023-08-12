import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./LogInFormContainer.module.css";
const LogInFormContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.logInFormContainer}>
      <h2 className={styles.logIn}>Log in</h2>
      <div className={styles.welcomeToCombobid}>{`Welcome to ComboBid `}</div>
      <TextField
        className={styles.username}
        sx={{ width: 460 }}
        color="primary"
        variant="outlined"
        type="text"
        label="Username"
        placeholder="Enter your username"
        size="medium"
        margin="none"
      />
      <TextField
        className={styles.username}
        sx={{ width: 460 }}
        color="primary"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleShowPasswordClick}
                aria-label="toggle password visibility"
              >
                <Icon>{showPassword ? "visibility_off" : "visibility"}</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Password"
        placeholder="Enter your password"
        size="medium"
        margin="none"
      />
      <FormControlLabel
        label="Remember me"
        labelPlacement="end"
        control={<Checkbox color="primary" size="small" />}
      />
      <button className={styles.signIn}>
        <div className={styles.signIn1}>Sign in</div>
      </button>
      <Link className={styles.dontHaveAn} to="/registration">
        Don't have an account? Join
      </Link>
    </div>
  );
};

export default LogInFormContainer;
