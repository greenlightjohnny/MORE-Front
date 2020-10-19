import React, { useContext, useState } from "react";
import Styles from "./register.module.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import UserContext from "../../context/UserContext";
import Joi from "joi";
import axios from "axios";

const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(256).required(),
  confirmpassword: Joi.ref("password"),
});

export default function Register() {
  const { register, handleSubmit, setError, watch, errors } = useForm({
    resolver: joiResolver(schema),
  });
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [nodeError, setNodeError] = useState("");
  const APIReg = "http://localhost:5000/api/v1/users/register";
  const APILogin = "http://localhost:5000/api/v1/users/login";

  const onSubmit = async (data) => {
    try {
      await axios.post(APIReg, data);
      const loginRes = await axios.post(APILogin, {
        email: data.email,
        password: data.password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("a-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      console.log(err.response.data.msg);
      err.response.data.msg && setNodeError(err.response.data.msg);
    }
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

          <input name="password" placeholder="password" ref={register} />
          <div className={Styles.errorcon}>
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <input name="confirmpassword" placeholder="password" ref={register} />
          <div className={Styles.errorcon}>
            {errors.confirmpassword && <p>Passwords do not match</p>}
          </div>

          <input type="submit" />
          <div className={Styles.errorcon}>
            {nodeError && <p>{nodeError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
