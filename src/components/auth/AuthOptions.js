import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
//import UserContext from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
const AuthOptions = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const register = () => {
    history.push("/register");
  };
  const login = () => {
    history.push("/login");
  };
  const logout = () => {
    authContext.setUser({
      token: undefined,
      user: undefined,
    });
    authContext.setIsAuthenticated(false);
    localStorage.setItem("a-token", "");
  };
  return (
    <div>
      {authContext.isAuthenticated ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>{" "}
        </>
      )}
    </div>
  );
};

export default AuthOptions;
