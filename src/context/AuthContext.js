import React, { createContext, useState, useEffect } from "react";
import AuthService from "../components/auth/AuthOptions";

//provides provider and consumer for global state
export const AuthContext = createContext();

export default ({ children }) => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("a-token");
      if (token === null) {
        localStorage.setItem("a-token", "");
        token = "";
      }
      console.log(token);
      const tokenRes = await axios.post(
        "http://localhost:5000/api/v1/users/isvalid",
        null,

        { headers: { daisy: token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/api/v1/users", {
          headers: { daisy: token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
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
