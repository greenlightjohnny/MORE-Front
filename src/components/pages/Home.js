import React from "react";
import Flow from "../../images/flow3.svg";
import Styles from "./home.module.scss";
import Icon1 from "../../images/icon1.png";
import Icon2 from "../../images/icon2.png";
import Icon3 from "../../images/icon3.png";
import Icon4 from "../../images/icon4.png";
import Icon5 from "../../images/icon5.png";

const Home = () => {
  return (
    <>
      <section className={Styles.hero}>
        <div className={Styles.heroCon}>
          <div className={Styles.heroFlex}>
            <div className={Styles.info}>
              <h1>MERN With JWT's For Fun And Profit</h1>
              <p>
                This is a boilerplate for future projects. It has registration,
                email conformations with unique URI's utilizing JWTs, client AND
                server side input validation, a separate JWT issued on login,
                HTTP and sameSite only cookie storage, hashed and salted
                passwords, and three servers just for fun. I'm using a
                smörgåsbord of technology to pull this off.
              </p>
            </div>
            <div className={Styles.tech}>
              <h3>The tech:</h3>
              <div className={Styles.logoflex}>
                <div className={Styles.iconcon}>
                  <img src={Icon1} alt="test" />
                </div>
                <div className={Styles.iconcon}>
                  <img src={Icon2} alt="test" />
                </div>
                <div className={Styles.iconcon}>
                  <img src={Icon3} alt="test" />
                </div>
                <div className={Styles.iconcon}>
                  <img src={Icon4} alt="test" />
                </div>
                <div className={Styles.iconcon}>
                  <img src={Icon5} alt="test" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={Styles.flow}>
        <div className={Styles.con}>
          <div className={Styles.imgcon}>
            <img src={Flow} alt="Diagram of servers" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
