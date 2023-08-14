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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios library
import styles from "./RegistrationFormContainer.module.css";

const RegistrationFormContainer = () => {
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false); // Define state for showing success snackbar
  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState(""); // Define state for success message

  const navigate = useNavigate(); // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false);
  const [bDDateTimePickerValue, setBDDateTimePickerValue] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [Name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountType, setAccountType] = useState("Bidder"); // Default value

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const handleSnackbarClose = () => {
    setShowSuccessSnackbar(false);
  };
  const handleRegistration = async () => {
    try {
      const response = await axios.post("http://localhost:3002/api/register", {
        username,
        password,
        email,
        family_name: familyName,
        name: Name,
        birth_date: bDDateTimePickerValue, // Pass the selected birth date
        account_type: accountType,
        contact_info: phoneNumber,
      });

      if (response.status === 200) {
        // Registration successful, you can redirect to a success page
        console.log("Registration successful");
        setShowSuccessSnackbar(true);
        setSuccessSnackbarMessage("Registration successful");
        navigate("/login");
      } else {
        // Handle registration failure
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
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
          placeholder="Choose a username"
          size="medium"
          margin="none"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className={styles.username}
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          type="email"
          label="Email address"
          placeholder="Example@example.com"
          size="medium"
          margin="none"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={styles.username}
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Family name"
          placeholder="Your family name"
          size="medium"
          margin="none"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />
        <TextField
          className={styles.username}
          sx={{ width: 460 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Last name"
          placeholder="Your last name"
          size="medium"
          margin="none"
          value={Name}
          onChange={(e) => setName(e.target.value)}
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
            <Select
              color="primary"
              size="medium"
              label="Account type"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
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
          placeholder="Enter your phone number"
          size="medium"
          margin="none"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <FormControlLabel
          label="I accept the Terms, Privacy Policy, and Cookie Policy."
          labelPlacement="end"
          control={<Checkbox color="primary" size="small" />}
        />
        <button className={styles.startnow} onClick={handleRegistration}>
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
