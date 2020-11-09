import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import Navbar from "./components/Navbar";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import FlashCard from "./components/FlashCard";
import DialogBox from "./components/DialogBox";

const render = () => {
  return ReactDOM.render(
    <Provider store={store}>
      <Router>
        <FlashCard />
        <DialogBox />
        <Navbar />
        <App />
      </Router>
    </Provider>,
    document.getElementById("root")
  );
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
