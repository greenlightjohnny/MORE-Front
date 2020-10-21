import Axios from "axios";
import React, { useState, useEffect, useSelector } from "react";
import { Route, Redirect } from "react-router-dom";

const Private2 = ({ component: Component, ...rest }) => {
  // State
  const [authenticated, setAuthentication] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  // Login function
  useEffect(() => {
    const isLogin = async () => {
      const checkAuth = "http://localhost:5000/api/v1/users/auth";
      try {
        const result = await Axios.get(checkAuth, { withCredentials: true });

        console.log(result.data);
        setAuthentication(true);
      } catch (e) {
        // Something failed
        console.log(e.data);
      }
      setLoadingComplete(true);
    };
    // run login function
    isLogin();
  }, []);
  if (loadingComplete) {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (!authenticated) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            );
          }

          return <Component {...props} />;
        }}
      />
    );
  } else {
    return <div> Loading... </div>;
  }
};

export default Private2;
