import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Confirm = () => {
  const { etoken } = useParams();
  console.log(etoken);

  useEffect(() => {
    const checkPlease = async () => {
      const confirmURL = "http://localhost:5000/api/v1/users/confirm";
      const loginRes = await axios.get(`${confirmURL}/${etoken}`);
      console.log(loginRes);
    };

    checkPlease();
  }, []);

  return (
    <div>
      <h1>Thanks! Your email is confirmed</h1>
    </div>
  );
};

export default Confirm;
