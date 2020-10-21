import React, { useContext, useState, useEffect } from "react";
import Styles from "./register.module.scss";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Joi from "joi";
import axios from "axios";
import Button from "../util/Button";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(256).required(),
});

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });
  const authcontext = useContext(AuthContext);
  const history = useHistory();
  const [nodeError, setNodeError] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const APILogin = "http://localhost:5000/api/v1/users/login";

  //clear nodeError
  const clearNode = () => {
    setNodeError("");
  };

  // Button loader
  useEffect(() => {
    if (isButtonLoading) {
      setTimeout(() => {
        setIsButtonLoading(false);
      }, 1000);
    }
  }, [isButtonLoading]);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //fetch data
  async function fetchData(data) {
    try {
      const loginRes = await axios.post(APILogin, data, {
        withCredentials: true,
      });

      authcontext.setIsAuthenticated(true);

      history.push("/");
    } catch (err) {
      err.response.data.msg && setNodeError(err.response.data.msg);
    }
  }

  // Handle login
  const onSubmit = async (data) => {
    setIsButtonLoading(true);

    clearNode();
    await delay(1000);
    await fetchData(data);
    // try {
    //   const loginRes = await axios.post(APILogin, data, {
    //     withCredentials: true,
    //   });
    //   setUserData({
    //     token: loginRes.data.token,
    //     user: loginRes.data.user,
    //   });
    //   localStorage.setItem("a-token", loginRes.data.token);
    //   history.push("/");
    // } catch (err) {
    //   setTimeout(() => {
    //     err.response.data.msg && setNodeError(err.response.data.msg);
    //   }, 1000);
    // }
  };
  const welcome = props.location.welcome;

  return (
    <div className={Styles.reg}>
      <div className={Styles.regcon}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          {welcome && <p>{welcome}</p>}
          <input
            name="email"
            placeholder="Email"
            defaultValue=""
            ref={register}
          />
          <div className={Styles.errorcon}>
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <input name="password" placeholder="password" ref={register} />
          <div className={Styles.errorcon}>
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          {/* <input type="submit" /> */}
          <Button type="submit" isLoading={isButtonLoading}>
            Submit
          </Button>
          <div className={Styles.errorcon}>
            {nodeError && <p>{nodeError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
