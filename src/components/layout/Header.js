import React from "react";
import Styles from "./header.module.scss";
import AuthOptions from "../auth/AuthOptions";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={Styles.main}>
      <nav className={Styles.container}>
        <Link to="/">
          <h1>Logo</h1>
        </Link>
        <Link to="/secrets">
          <h1>Secret</h1>
        </Link>
        <AuthOptions />
      </nav>
    </header>
  );
};

export default Header;
