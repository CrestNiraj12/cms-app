import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Navbar from "./components/Navbar";
import * as serviceWorker from "./serviceWorker";

const render = () => {
  return ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Navbar />
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
