import React from "react";
import Flow from "../../images/flow3.svg";
import Styles from "./home.module.scss";
const Home = () => {
  return (
    <>
      <section className={Styles.hero}>
        <div className={Styles.heroCon}></div>
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
