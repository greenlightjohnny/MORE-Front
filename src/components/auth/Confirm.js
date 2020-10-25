import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import Styles from "./confirm2.module.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Confirm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { etoken } = useParams();
  const history = useHistory();

  useEffect(() => {
    console.log("Con.js", etoken);
    let ignore = false;
    const checkPlease = async () => {
      try {
        setLoading(true);
        setError({});
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));
        const confirmURL = "/api/v1/users/confirm";
        const loginRes = await axios.get(`${confirmURL}/${etoken}`);
        // if(!ignore) setData(confirmURL.data)
        return Promise.all([loginRes, timer]).then(([response]) => {
          console.log(response);
          setData(response.data);
          console.log("ayyyy");
          setLoading(false);
          setRedirect(true);
        });
      } catch (err) {
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));
        return Promise.all([err, timer]).then(([response]) => {
          console.log(err.response);
          setError(err.response.data.msg);
          setLoading(false);
        });
      }
    };

    checkPlease();
    return () => {
      ignore = true;
    };
  }, []);

  //// If valid, redirect to login page after xx time
  // Thanks Carlos! https://stackoverflow.com/questions/58325897/use-react-hook-with-redirect-and-settimeout
  useEffect(() => {
    if (redirect) {
      let timei = setTimeout(() => {
        history.push({
          pathname: "/login",
          welcome: "Thanks for registering! Please login below",
        });
      }, 2000);
      return () => clearTimeout(timei);
    }
  }, [redirect]);

  return (
    <div className={Styles.con}>
      <div className={Styles.center}>
        {loading ? (
          <>
            <h1>Confirming email...</h1>
            <div className={Styles.spinnercon}>
              <Loader
                type="Puff"
                color="#00BFFF"
                height={200}
                width={200}
                margin="0 auto"
                timeout={3000} //3 secs
              />
            </div>
          </>
        ) : (
          <h1>{data ? data : error}</h1>
        )}
      </div>
    </div>
  );
};

export default Confirm;
