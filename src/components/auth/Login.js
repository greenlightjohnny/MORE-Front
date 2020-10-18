import React from "react";
import Styles from "./register.module.scss";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Joi from "joi";

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
  const onSubmit = (data) => {
    // try {
    //     await fetch(GATEWAY_URL, {
    //       method: 'POST',
    //       mode: 'no-cors',
    //       cache: 'no-cache',
    //       body: JSON.stringify(data),
    //       headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //       },
    //     })
    //     downloadFile()
    //     setSubmitted(true)
    //     testt()
    //   } catch (error) {
    //     console.log('$$$$$Error', error)
    //     setError(
    //       'submit',
    //       'submitError',
    //       `Oops! There seems to be an issue! ${error.message}`
    //     )
    //   }
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
        </form>
      </div>
    </div>
  );
}
