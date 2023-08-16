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

import styles from "./RegistrationFormContainer.module.css";

const RegistrationFormContainer = () => {
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [familyNameError, setFamilyNameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [termsError, setTermsError] = useState(false);
  const [showRegistrationError, setShowRegistrationError] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false);
  const [bDDateTimePickerValue, setBDDateTimePickerValue] = useState(
    new Date(1999, 0, 1)
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [Name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountType, setAccountType] = useState("Bidder"); // Default value
  function validateUsername(username) {
    // Check if username is not empty
    if (!username) {
      return false;
    }

    // Check for minimum and maximum length
    if (username.length < 5 || username.length > 20) {
      return false;
    }

    // Check for allowed characters (letters, numbers, and underscore)
    const allowedCharactersRegex = /^[a-zA-Z0-9_]+$/;
    if (!allowedCharactersRegex.test(username)) {
      return false;
    }

    // Perform additional checks for uniqueness
    // You would need to implement this part using your API or database
    // For this example, let's assume the username "admin" is not allowed
    const reservedUsernames = ["admin"]; // Add any reserved usernames here
    if (reservedUsernames.includes(username)) {
      return false;
    }

    return true; // If all checks pass, the username is valid
  }
  function validatePassword(password) {
    // Check if password is not empty
    if (!password) {
      return false;
    }

    // Check for minimum and maximum length
    if (password.length < 8) {
      return false;
    }

    // Add any additional password validation rules here
    // For example, requiring at least one uppercase letter, one lowercase letter, and one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
      return false;
    }

    return true; // If all checks pass, the password is valid
  }
  function validateEmail(email) {
    // Regular expression pattern for a simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  function validateName(name) {
    // Check if name is not empty
    if (!name) {
      return false;
    }
    const allowedCharactersRegex = /^[a-zA-Z\s]+$/;
    if (!allowedCharactersRegex.test(name)) {
      return false;
    }

    // Check for valid length (adjust the min and max values as needed)
    if (name.length < 2 || name.length > 50) {
      return false;
    }

    // You can add additional checks if needed
    return true;
  }
  function validatePhoneNumber(phoneNumber) {
    // Check if phone number is not empty
    if (!phoneNumber) {
      return false;
    }

    // Check for allowed characters (only numbers and optional plus sign)
    const allowedCharactersRegex = /^[0-9+]+$/;
    if (!allowedCharactersRegex.test(phoneNumber)) {
      return false;
    }

    // Check for a valid format (e.g., +1234567890 or 1234567890)
    const validFormatRegex = /^\+?[0-9]{10,}$/;
    if (!validFormatRegex.test(phoneNumber)) {
      return false;
    }

    return true; // If all checks pass, the phone number is valid
  }

  const isDateValid = (date) => {
    if (!date) {
      return false;
    }

    const now = new Date();
    const age13 = new Date();

    age13.setFullYear(age13.getFullYear() - 13);

    return date <= now && date <= age13;
  };

  const handleDateChange = (newValue) => {
    if (isDateValid(newValue)) {
      setBDDateTimePickerValue(newValue);
    }
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = async () => {
    try {
      // Reset errors
      setUsernameError(false);
      setPasswordError(false);
      setEmailError(false);
      setFamilyNameError(false);
      setNameError(false);
      setPhoneNumberError(false);

      // Validate fields
      let hasErrors = false;
      if (!validateUsername(username)) {
        setUsernameError(true);
        hasErrors = true;
      }
      if (!validatePassword(password)) {
        setPasswordError(true);
        hasErrors = true;
      }
      if (!validateEmail(email)) {
        setEmailError(true);
        hasErrors = true;
      }
      if (!validateName(familyName)) {
        setFamilyNameError(true);
        hasErrors = true;
      }
      if (!validateName(Name)) {
        setNameError(true);
        hasErrors = true;
      }
      if (!validatePhoneNumber(phoneNumber)) {
        setPhoneNumberError(true);
        hasErrors = true;
      }
      if (!termsAgreed) {
        setTermsError(true);
        hasErrors = true;
      } else {
        setTermsError(false);
      }

      if (hasErrors) {
        return; // Do not proceed with registration if there are errors
      }

      if (!hasErrors) {
        // Registration successful, you can redirect to a success page
        const response = await fetch("http://localhost:3002/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            family_name: familyName,
            name: Name,
            birth_date: bDDateTimePickerValue,
            account_type: accountType,
            contact_info: phoneNumber,
          }),
        });
        if (response.ok & !hasErrors) {
          console.log("Registration successful");
          setShowSuccessSnackbar(true);
          setSuccessSnackbarMessage("Registration successful");
          navigate("/login");
        } else {
          // Handle registration failure
          console.error("username or email already used");
          setShowRegistrationError(true);
        }
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
        {showRegistrationError && (
          <FormHelperText error>Username or email already used.</FormHelperText>
        )}
        <TextField
          className={`${styles.username} ${
            usernameError ? styles.errorInput : ""
          }`}
          sx={{
            width: 460,
            "& input": {
              color: usernameError ? "red" : "inherit",
              borderColor: usernameError ? "red" : "inherit",
            },
          }}
          variant="outlined"
          type="text"
          label="Username"
          placeholder="Choose a username"
          size="medium"
          margin="none"
          required
          error={Boolean(usernameError)}
          helperText={
            usernameError
              ? "Username must be unique and not already taken, and should have a valid length, and no special charater nor spaces."
              : ""
          }
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameError(false); // Reset error when user types
          }}
          onBlur={() => {
            if (!username) {
              setUsernameError(true);
            } else if (!validateUsername(username)) {
              setUsernameError(true);
            }
          }}
        />
        <TextField
          className={`${styles.username} ${
            passwordError ? styles.errorInput : ""
          }`}
          sx={{
            width: 460,
            "& input": {
              color: passwordError ? "red" : "inherit",
              borderColor: passwordError ? "red" : "inherit",
            },
          }}
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
          error={Boolean(passwordError)}
          helperText={
            passwordError
              ? "Password must have at least 8 characters and include uppercase, lowercase, and digit."
              : ""
          }
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false); // Reset error when user types
          }}
          onBlur={() => {
            if (!password) {
              setPasswordError("Password is required.");
            } else if (!validatePassword(password)) {
              setPasswordError(true);
            }
          }}
        />

        <TextField
          className={`${styles.username} ${
            emailError ? styles.errorInput : ""
          }`}
          sx={{
            width: 460,
            "& input": {
              color: emailError ? "red" : "inherit",
              borderColor: emailError ? "red" : "inherit",
            },
          }}
          variant="outlined"
          type="email"
          label="Email address"
          placeholder="Example@example.com"
          size="medium"
          margin="none"
          required
          error={Boolean(emailError)}
          helperText={emailError ? "Please enter a valid email address." : ""}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false); // Reset error when user types
          }}
          onBlur={() => {
            if (!email) {
              setEmailError("Email is required.");
            } else if (!validateEmail(email)) {
              setEmailError(true);
            }
          }}
        />
        <TextField
          className={`${styles.username} ${
            familyNameError ? styles.errorInput : ""
          }`}
          sx={{
            width: 460,
            "& input": {
              color: familyNameError ? "red" : "inherit",
              borderColor: familyNameError ? "red" : "inherit",
            },
          }}
          variant="outlined"
          type="text"
          label="Family name"
          placeholder="Your family name"
          size="medium"
          margin="none"
          required
          error={Boolean(familyNameError)}
          helperText={
            familyNameError ? "Please enter a valid family name." : ""
          }
          value={familyName}
          onChange={(e) => {
            setFamilyName(e.target.value);
            setFamilyNameError(false); // Reset error when user types
          }}
          onBlur={() => {
            if (!familyName) {
              setFamilyNameError("Family name is required.");
            } else if (!validateName(familyName)) {
              setFamilyNameError(true);
            }
          }}
        />

        <TextField
          className={`${styles.username} ${nameError ? styles.errorInput : ""}`}
          sx={{
            width: 460,
            "& input": {
              color: nameError ? "red" : "inherit",
              borderColor: nameError ? "red" : "inherit",
            },
          }}
          variant="outlined"
          type="text"
          label="Last name"
          placeholder="Your last name"
          size="medium"
          margin="none"
          required
          error={Boolean(nameError)}
          helperText={nameError ? "Please enter a valid name." : ""}
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false); // Reset error when user types
          }}
          onBlur={() => {
            if (!Name) {
              setNameError("Name is required.");
            } else if (!validateName(Name)) {
              setNameError(true);
            }
          }}
        />

        <div className={styles.dbAndAccountt}>
          <div>
            <DatePicker
              label="Date of Birth"
              value={bDDateTimePickerValue}
              onChange={handleDateChange}
              shouldDisableDate={(date) => !isDateValid(date)}
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
          className={`${styles.username} ${
            phoneNumberError ? styles.errorInput : ""
          }`}
          sx={{
            width: 460,
            "& input": {
              color: phoneNumberError ? "red" : "inherit",
              borderColor: phoneNumberError ? "red" : "inherit",
            },
          }}
          variant="outlined"
          type="tel"
          label="Phone number"
          placeholder="Enter your phone number"
          size="medium"
          margin="none"
          required
          error={Boolean(phoneNumberError)}
          helperText={
            phoneNumberError ? "Please enter a valid phone number." : ""
          }
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setPhoneNumberError(false); // Reset error when user types
          }}
          onBlur={() => {
            if (!validatePhoneNumber(phoneNumber)) {
              setPhoneNumberError(true);
            }
          }}
        />

        <FormControlLabel
          label="I accept the Terms, Privacy Policy, and Cookie Policy."
          style={{ color: termsError ? "red" : "inherit" }}
          labelPlacement="end"
          control={
            <Checkbox
              color="primary"
              size="small"
              required
              checked={termsAgreed}
              onChange={(e) => {
                setTermsAgreed(e.target.checked);
                setTermsError(!e.target.checked); // Show error if checkbox is unchecked
              }}
              style={{ color: termsError ? "red" : "inherit" }}
            />
          }
        />

        {termsError && (
          <FormHelperText error>
            You must accept the terms to proceed.
          </FormHelperText>
        )}

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
