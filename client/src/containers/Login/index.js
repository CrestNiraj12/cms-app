import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { setAuth, showFlash } from "../../actions";
import AuthenticationForm from "../../components/AuthenticationForm";
import { LOGIN_PAGE } from "../../constants";

const mapDispatchToProps = (dispatch) => ({
  showFlash: (flash) => dispatch(showFlash(flash)),
  setAuth: (auth) => dispatch(setAuth(auth)),
});

const Login = ({ showFlash, setAuth }) => {
  var history = useHistory();
  const [details, setDetails] = useState({});
  const [error, setError] = useState({ status: false, message: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", details)
      .then((res) => {
        setError({ status: false });
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("authUserId", res.data.user.id);
        localStorage.setItem("admin", res.data.user.admin);
        setAuth({
          status: true,
          authUserId: res.data.user.id,
          admin: res.data.user.admin,
        });
        showFlash({ status: true, message: res.data.message });
        history.push(res.data.user.admin ? "/dashboard" : "/");
      })
      .catch((err) => {
        console.log(err.response);
        setError({ status: true, message: err.response.data });
      });
  };

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <AuthenticationForm
      page={LOGIN_PAGE}
      error={error}
      handleInputChange={handleInputChange}
      handleSubmit={handleLogin}
    />
  );
};

export default connect(null, mapDispatchToProps)(Login);
