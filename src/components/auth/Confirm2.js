import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import Styles from "./confirm2.module.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Confirm2 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState("");

  const { etoken } = useParams();

  useEffect(() => {
    let ignore = false;
    const checkPlease = async () => {
      try {
        setLoading(true);
        setError({});
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));
        const confirmURL = "http://localhost:5000/api/v1/users/confirm";
        const loginRes = await axios.get(`${confirmURL}/${etoken}`);
        // if(!ignore) setData(confirmURL.data)
        return Promise.all([loginRes, timer]).then(([response]) => {
          console.log(response);
          setData(response.data);
          setLoading(false);
        });
      } catch (err) {
        console.log(err.response);
        setError(err.response.data.msg);
        console.log(err.response.data.msg);
      }
      setLoading(false);
    };

    checkPlease();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={Styles.center}>
      {loading ? (
        <>
          <h1>Confirming email...</h1>
          <div className={Styles.spinnercon}>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              margin="0 auto"
              timeout={3000} //3 secs
            />
          </div>
        </>
      ) : (
        <h1>{data ? data : error}</h1>
      )}
    </div>
  );
};

export default Confirm2;
