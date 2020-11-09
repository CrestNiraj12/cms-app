import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Signup} />
      </Switch>
    );
  }
}

export default App;
