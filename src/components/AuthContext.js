import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    if (username) {
      const fetchUserIdByUsername = async () => {
        try {
          const response = await fetch("http://localhost:3002/api/users");
          const allUsers = await response.json();

          const user = allUsers.find((user) => user.username === username);
          console.log("fasdfasd" + user);
          if (user) {
            setUserid(user.user_id); // Assuming the user ID field is named 'id'
          } else {
            setUserid(null); // User not found
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
    console.log("username is :" + username);
    console.log("id is :" + userid);
  };

  const logOut = () => {
    setLoggedIn(false);
    setUsername(null);
    setUserid(null); // Reset user ID on logout
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, userid, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
