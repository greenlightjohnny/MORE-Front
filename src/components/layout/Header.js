import React from "react";
import Styles from "./header.module.scss";
import AuthOptions from "../auth/AuthOptions";
import { Link } from "react-router-dom";
import Logo from "../../images/logo3.png";
const Header = () => {
  return (
    <header className={Styles.main}>
      <nav className={Styles.container}>
        <Link to="/">
          <div className={Styles.logocon}>
            <img src={Logo} alt="Abstract logo" />
          </div>
        </Link>

        <AuthOptions />
      </nav>
    </header>
  );
};

export default Header;
