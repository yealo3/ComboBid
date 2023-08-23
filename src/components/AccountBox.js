import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import styles from "./AccountBox.module.css";

const AccountBox = () => {
  const { loggedIn, username } = useAuth(); // Change userId to username
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (loggedIn && username) {
      // Fetch user data using the username
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3002/api/data/users/${username}` // Change userId to username
          );
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [loggedIn, username]);
  return (
    <div className={styles.accountBox}>
      <h2 className={styles.accountDetails}>Account details</h2>
      <img className={styles.pfpIcon} alt="" src="/pfp.svg" />
      <div className={styles.details}>
        <div className={styles.usernameB}>
          <div className={styles.username}>{`Username: `}</div>
          <div className={styles.username}>{userData?.username}</div>
        </div>
        <div className={styles.usernameB}>
          <div className={styles.username}>{`Full name: `}</div>
          <div className={styles.username}>
            {userData?.name + ` ` + userData?.family_name}
          </div>
        </div>
        <div className={styles.usernameB}>
          <div className={styles.username}>Account type:</div>
          <div className={styles.username}>{userData?.account_type}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountBox;
