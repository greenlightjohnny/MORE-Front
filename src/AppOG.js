import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import UserContext from "./context/UserContext";
import Confirm from "./components/auth/Confirm";
import Secret from "./components/pages/Secrets";
function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("a-token");
      if (token === null) {
        localStorage.setItem("a-token", "");
        token = "";
      }
      console.log(token);
      const tokenRes = await axios.post(
        "http://localhost:5000/api/v1/users/isvalid",
        null,

        { headers: { daisy: token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/api/v1/users", {
          headers: { daisy: token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     let token = localStorage.getItem("a-token");
  //     if (token === null) {
  //       localStorage.setItem("a-token", "");
  //       token = "";
  //     }
  //     console.log(token);
  //     const tokenRes = await axios.post(
  //       "http://localhost:5000/api/v1/users/login",

  //       { email: "lost@lost.com", password: "lostlost" }
  //     );

  //     console.log(tokenRes.data);
  //   };
  //   checkLoggedIn();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/confirm/:etoken" component={Confirm}></Route>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
