import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link } from "react-router-dom";
import styles from "./RegistrationFormContainer.module.css";
const RegistrationFormContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [bDDateTimePickerValue, setBDDateTimePickerValue] = useState(null);
  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.registrationFormContainer}>
        <h2 className={styles.registrationForm}>Registration form</h2>
        <div className={styles.signUpAnd}>Sign up and start competing.</div>
        <TextField
          className={styles.username}
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Username"
          placeholder="choose a username"
          size="medium"
          margin="none"
          required
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
          placeholder="Choose your password"
          size="medium"
          margin="none"
          required
        />
        <TextField
          className={styles.username}
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          type="email"
          label="Email adress"
          placeholder="Example@example.com"
          size="medium"
          margin="none"
          required
        />
        <TextField
          className={styles.username}
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Family name"
          placeholder="your family name"
          size="medium"
          margin="none"
        />
        <TextField
          className={styles.username}
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Last name"
          placeholder="your last name"
          size="medium"
          margin="none"
        />
        <div className={styles.dbAndAccountt}>
          <div>
            <DatePicker
              label="Date of Birth"
              value={bDDateTimePickerValue}
              onChange={(newValue) => {
                setBDDateTimePickerValue(newValue);
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
          <FormControl sx={{ width: 212 }} variant="outlined" required>
            <InputLabel color="primary">Account type</InputLabel>
            <Select color="primary" size="medium" label="Account type">
              <MenuItem value="Bidder">Bidder</MenuItem>
              <MenuItem value="Auctioneer">Auctioneer</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
        <TextField
          className={styles.username}
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          defaultValue="+213 "
          type="tel"
          label="Phone number"
          placeholder="enter your phone number"
          size="medium"
          margin="none"
        />
        <FormControlLabel
          label="I accept the Terms, Privacy Policy, and Cookie Policy."
          labelPlacement="end"
          control={<Checkbox color="primary" size="small" />}
        />
        <button className={styles.startnow}>
          <div className={styles.startNow}>Start now</div>
        </button>
        <Link className={styles.alreadyHaveAn} to="/login">
          Already have an account? Log In
        </Link>
      </div>
    </LocalizationProvider>
  );
};

export default RegistrationFormContainer;
