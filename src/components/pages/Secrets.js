import React from "react";
import Styles from "./secrets.module.scss";
const Secrets = () => {
  return (
    <div className={Styles.con}>
      <h2>Only logged in users can view this</h2>
    </div>
  );
};

export default Secrets;
