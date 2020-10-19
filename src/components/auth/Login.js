import React, { useContext, useState } from "react";
import Styles from "./register.module.scss";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Joi from "joi";
import axios from "axios";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(256).required(),
});

export default function Login() {
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: joiResolver(schema),
  });
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [nodeError, setNodeError] = useState("");
  const APILogin = "http://localhost:5000/api/v1/users/login";

  //clear nodeError
  const clearNode = () => {
    setNodeError("");
  };

  // Handle login
  const onSubmit = async (data) => {
    clearNode();
    try {
      const loginRes = await axios.post(APILogin, data);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("a-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setNodeError(err.response.data.msg);
    }
  };

  return (
    <div className={Styles.reg}>
      <div className={Styles.regcon}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
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

          <input type="submit" />
          <div className={Styles.errorcon}>
            {nodeError && <p>{nodeError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
