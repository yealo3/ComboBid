import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null); // Change userId to username

  const logIn = (username) => {
    // my login logic
    setLoggedIn(true);
    setUsername(username); // Set the username when logging in
    console.log("username is :" + username);
  };

  const logOut = () => {
    // my logout logic
    setLoggedIn(false);
    setUsername(null); // Reset username on logout
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
