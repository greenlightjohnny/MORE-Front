import React from "react";
import Styles from "./register.module.scss";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Joi from "joi";

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

  const myAPI = "http://localhost:5000/api/v1/users/register";

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await fetch(myAPI, {
        method: "POST",

        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      //console.log('$$$$$Error', error)
      setError(
        "submit",
        "submitError",
        `Oops! There seems to be an issue! ${error.message}`
      );
    }
  };

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
        </form>
      </div>
    </div>
  );
}
