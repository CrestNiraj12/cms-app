import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setAuth } from "./actions";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";

const mapDispatchToProps = (dispatch) => ({
  setAuth: (auth) => dispatch(setAuth(auth)),
});

const App = ({ setAuth }) => {
  useEffect(() => {
    setAuth({
      status: localStorage.getItem("isAuthenticated") === "true",
      authUserId: localStorage.getItem("authUserId"),
    });
  });

  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="*" component={Home} exact />
    </Switch>
  );
};

export default connect(null, mapDispatchToProps)(App);
