import React, { useContext, useState, useEffect } from "react";
import Styles from "./register.module.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";

import { AuthContext } from "../../context/AuthContext";
import Joi from "joi";
import axios from "axios";
import Button from "../util/Button";

const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(256).required(),
  confirmpassword: Joi.ref("password"),
});

export default function Register() {
  const { register, handleSubmit, setError, errors } = useForm({
    resolver: joiResolver(schema),
  });
  //const { setUserData } = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [nodeError, setNodeError] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    if (isButtonLoading) {
      setTimeout(() => {
        setIsButtonLoading(false);
      }, 1000);
    }
  }, [isButtonLoading]);

  const APIReg = "/api/v1/users/register";

  ///delay function
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function fetchData(data) {
    try {
      await axios.post(APIReg, data);
      //   const loginRes = await axios.post(APILogin, {
      //     email: data.email,
      //     password: data.password,
      //   });
      //   setUserData({
      //     token: loginRes.data.token,
      //     user: loginRes.data.user,
      //   });
      //   localStorage.setItem("a-token", loginRes.data.token);

      history.push({
        pathname: "/login",
        welcome:
          "Thanks for registering! Please check your email to complete registration",
      });
    } catch (err) {
      console.log(err);
      err.response.data.msg && setNodeError(err.response.data.msg);
    }
  }

  const onSubmit = async (data) => {
    setIsButtonLoading(true);
    await delay(1000);
    await fetchData(data);
    // try {
    //   await axios.post(APIReg, data);
    //     const loginRes = await axios.post(APILogin, {
    //       email: data.email,
    //       password: data.password,
    //     });
    //     setUserData({
    //       token: loginRes.data.token,
    //       user: loginRes.data.user,
    //     });
    //     localStorage.setItem("a-token", loginRes.data.token);

    //   history.push({
    //     pathname: "/login",
    //     welcome:
    //       "Thanks for registering! Please check your email to complete registration",
    //   });
    // } catch (err) {
    //   setTimeout(() => {

    //   }, 1000)
    //   console.log(err);
    //   err.response.data.msg && setNodeError(err.response.data.msg);
    // }
  };

  //   const onSubmit = async (data) => {
  //     try {
  //       const regRes = await fetch(APIReg, {
  //         method: "POST",

  //         body: JSON.stringify(data),
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const userData = await regRes.json();
  //       const loginData = {
  //         email: data.email,
  //         password: data.password,
  //       };
  //       if (userData) {
  //         const loginRes = await fetch(APILogin, {
  //           method: "POST",

  //           body: JSON.stringify(loginData),
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         const loginJ = await loginRes.json();
  //         setUserData({
  //           token: loginJ.token,
  //           user: loginJ.user,
  //         });
  //         localStorage.setItem("a-token", loginJ.token);
  //         history.push("/");
  //       }
  //     } catch (error) {
  //       //console.log('$$$$$Error', error)
  //       setError(
  //         "submit",
  //         "submitError",
  //         `Oops! There seems to be an issue! ${error.message}`
  //       );
  //     }
  //   };

  return (
    <div className={Styles.reg}>
      <div className={Styles.regcon}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Register</h1>
          <div className={Styles.errorcon}></div>
          <input
            name="email"
            placeholder="Email"
            defaultValue=""
            ref={register}
          />
          <div className={Styles.errorcon}>
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <input name="name" placeholder="Name" ref={register} />
          <div className={Styles.errorcon}>
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <input name="password" placeholder="Password" ref={register} />
          <div className={Styles.errorcon}>
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <input
            name="confirmpassword"
            placeholder="Confirm Password"
            ref={register}
          />
          <div className={Styles.errorcon}>
            {errors.confirmpassword && <p>Passwords do not match</p>}
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
