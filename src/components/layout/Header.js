import React from "react";
import Styles from "./header.module.scss";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={Styles.main}>
      <div className={Styles.container}>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Header;
