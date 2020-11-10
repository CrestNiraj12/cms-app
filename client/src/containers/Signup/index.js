import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { setAuth, showFlash } from "../../actions";
import { SIGNUP_PAGE } from "../../constants";
import AuthenticationForm from "../../components/AuthenticationForm";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  showFlash: (flash) => dispatch(showFlash(flash)),
  setAuth: (auth) => dispatch(setAuth(auth)),
});

const SignUp = ({ showFlash, setAuth }) => {
  var history = useHistory();
  const [details, setDetails] = useState({});
  const [error, setError] = useState({ status: false, message: "" });

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post("/auth/register", details)
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
      page={SIGNUP_PAGE}
      error={error}
      handleInputChange={handleInputChange}
      handleSubmit={handleSignUp}
    />
  );
};

export default connect(null, mapDispatchToProps)(SignUp);
