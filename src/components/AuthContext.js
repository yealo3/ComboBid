import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedUserId = localStorage.getItem("userId");
  const storedUsername = localStorage.getItem("username");
  const storedRememberMe = localStorage.getItem("rememberMe");
  const [loggedIn, setLoggedIn] = useState(storedRememberMe);
  const [username, setUsername] = useState(storedUsername);
  const [userid, setUserid] = useState(storedUserId);

  useEffect(() => {
    if (storedUserId && storedRememberMe === "true") {
      setUserid(storedUserId);
      setLoggedIn(true);
      setUsername(storedUsername);
    }
    if (username) {
      const fetchUserIdByUsername = async () => {
        try {
          const response = await fetch("http://localhost:3002/api/users");
          const allUsers = await response.json();

          const user = allUsers.find((user) => user.username === username);
          console.log("fasdfasd" + user);
          if (user) {
            setUserid(user.user_id); // Assuming the user ID field is named 'id'
            localStorage.setItem("userId", user.user_id);
          } else {
            setUserid(null); // User not found
            localStorage.setItem("userId", null);
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
          setUserid(null);
        }
      };

      fetchUserIdByUsername();
    }
  }, [username]);

  const logIn = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const logOut = () => {
    setLoggedIn(false);
    setUsername(null);
    setUserid(null);
    localStorage.setItem("userId", null);
    localStorage.setItem("rememberMe", false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, userid, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
