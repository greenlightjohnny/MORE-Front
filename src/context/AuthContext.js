import React, { createContext, useState, useEffect } from "react";
import AuthService from "../components/auth/AuthOptions";
import axios from "axios";

//provides provider and consumer for global state
export const AuthContext = createContext();

export default ({ children }) => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const userRes = await axios.get(
        "http://localhost:5000/api/v1/users/auth",
        { withCredentials: true }
      );
      if (userRes.data) {
        setIsAuthenticated(true);
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
