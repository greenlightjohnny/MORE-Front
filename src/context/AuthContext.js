import React, { createContext, useState, useEffect } from "react";

import axios from "axios";

//provides provider and consumer for global state
export const AuthContext = createContext();

export default ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("context check peopleee");
    const checkLoggedIn = async () => {
      try {
        const userRes = await axios.get(
          "http://localhost:5000/api/v1/users/auth",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
      } catch (err) {
        console.log(err.response);
      }

      //     setUserData({
      //       token,
      //       user: userRes.data,
      //     });
      //     setIsAuthenticated()
      //   }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
