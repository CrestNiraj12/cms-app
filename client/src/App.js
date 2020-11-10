import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setAuth } from "./actions";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";
import MyPosts from "./containers/MyPosts";
import NewPost from "./containers/NewPost";
import BlogPost from "./containers/BlogPost";

const mapDispatchToProps = (dispatch) => ({
  setAuth: (auth) => dispatch(setAuth(auth)),
});

const AdminRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("admin") === "true" ? (
        <Route {...props} component={component} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("isAuthenticated") === "true" ? (
        <Route {...props} component={component} />
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
      <Route path="/posts/:postPath" component={BlogPost} />,
      <PrivateRoute path="/newpost" component={NewPost} />
      <PrivateRoute path="/myblog" component={MyPosts} />
      <AdminRoute exact path="/dashboard" component={Dashboard} />
      <Route path="*" component={Home} exact />
    </Switch>
  );
};

export default connect(null, mapDispatchToProps)(App);
