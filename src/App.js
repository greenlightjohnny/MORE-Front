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
import Private from "./hocs/Private";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/register" component={Register}></Route>
          <Private path="/secrets" component={Secret}></Private>
          <Route path="/confirm/:etoken" component={Confirm}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
