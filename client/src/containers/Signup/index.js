import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import styles from "./Signup.module.css";

const Login = () => {
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
        localStorage.setItem("id", res.data.user.id);
        history.push("/");
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
    <Container className={styles.container} maxWidth="xs">
      <Typography variant="h4" color="textSecondary" align="center">
        Sign Up
      </Typography>
      <form>
        <Grid container spacing={3} style={{ marginTop: "50px" }}>
          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="secondary" align="center">
                {error.message}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullname"
                  size="small"
                  variant="outlined"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  minLength={8}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button
              color="secondary"
              fullWidth
              type="submit"
              variant="contained"
              onClick={handleSignUp}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{ fontSize: 12 }}
              variant="body1"
              color="textSecondary"
              align="center"
            >
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
