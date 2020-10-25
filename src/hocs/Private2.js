import Axios from "axios";
import React, { useState, useEffect, useSelector } from "react";
import { Route, Redirect } from "react-router-dom";
import Styles from "../components/pages/secrets.module.scss";

const Private2 = ({ component: Component, ...rest }) => {
  // State
  const [authenticated, setAuthentication] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  // Login function
  useEffect(() => {
    const isLogin = async () => {
      const checkAuth = "/api/v1/users/auth";
      try {
        const result = await Axios.get(checkAuth, { withCredentials: true });

        console.log(result.data);
        setAuthentication(true);
      } catch (e) {
        // Something failed
        console.log(e.response.data);
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
                  welcome: "Not logged in",
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
    return <div className={Styles.con}> </div>;
  }
};

export default Private2;
