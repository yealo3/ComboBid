import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LogInFormContainer.module.css";

const LogInFormContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false); // State for login error
  const [loginSuccess, setLoginSuccess] = useState(false); // State for successful login
  const navigate = useNavigate();

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        // Redirect to a protected route after successful login
        navigate("/Market");
        setLoginSuccess(true);
      } else {
        // Handle login failure
        setLoginError(true); // Show login error message
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const handleCloseError = () => {
    setLoginError(false); // Close login error message
  };

  const handleCloseSuccess = () => {
    setLoginSuccess(false); // Close login success message
  };
  return (
    <div className={styles.logInFormContainer}>
      <h2 className={styles.logIn}>Log in</h2>
      <div className={styles.welcomeToCombobid}>{`Welcome to ComboBid `}</div>
      {loginError && (
        <div className={styles.errorMsg}>Wrong username or password</div>
      )}
      {loginSuccess && (
        <Snackbar
          open={loginSuccess}
          autoHideDuration={5000}
          onClose={handleCloseSuccess}
        >
          <SnackbarContent message="Login Successful" />
        </Snackbar>
      )}
      <TextField
        className={`${styles.username} ${loginError ? styles.errorInput : ""}`}
        sx={{
          width: 460,
          "& input": {
            color: loginError ? "red" : "inherit",
            borderColor: loginError ? "red" : "inherit",
          },
        }}
        variant="outlined"
        type="text"
        label="Username"
        placeholder="Enter your username"
        size="medium"
        margin="none"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        className={`${styles.username} ${loginError ? styles.errorInput : ""}`}
        sx={{
          width: 460,
          "& input": {
            color: loginError ? "red" : "inherit",
            borderColor: loginError ? "red" : "inherit",
          },
        }}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <FormControlLabel
        label="Remember me"
        labelPlacement="end"
        control={<Checkbox color="primary" size="small" />}
      />
      <button className={styles.signIn} onClick={handleLogin}>
        <div className={styles.signIn1}>Sign in</div>
      </button>
      <Link className={styles.dontHaveAn} to="/registration">
        Don't have an account? Join
      </Link>
    </div>
  );
};

export default LogInFormContainer;
