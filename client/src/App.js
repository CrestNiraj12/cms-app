import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setAuth } from "./actions";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";
import MyPosts from "./containers/MyPosts";

const mapDispatchToProps = (dispatch) => ({
  setAuth: (auth) => dispatch(setAuth(auth)),
});

const AdminRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("admin") === "true" ? (
        <Dashboard {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("isAuthenticated") === "true" ? (
        <MyPosts {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const App = ({ setAuth }) => {
  useEffect(() => {
    setAuth({
      status: localStorage.getItem("isAuthenticated") === "true",
      authUserId: localStorage.getItem("authUserId"),
      admin: localStorage.getItem("admin") === "true",
    });
  });

  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Signup} />
      <PrivateRoute path="/myblog" component={MyPosts} />
      <AdminRoute exact path="/dashboard" component={Dashboard} />
      <Route path="*" component={Home} exact />
    </Switch>
  );
};

export default connect(null, mapDispatchToProps)(App);
