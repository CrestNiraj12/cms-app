import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import styles from "./AuthenticationForm.module.css";
import { LOGIN_PAGE, SIGNUP_PAGE } from "../../constants";

const AuthenticationForm = ({
  page,
  error,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <Container className={styles.container} maxWidth="xs">
      <Typography variant="h4" color="textSecondary" align="center">
        {page === LOGIN_PAGE ? "Login" : "Sign Up"}
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
              {page === SIGNUP_PAGE && (
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
              )}
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
              onClick={handleSubmit}
            >
              {page}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{ fontSize: 12 }}
              variant="body1"
              color="textSecondary"
              align="center"
            >
              {page === LOGIN_PAGE ? "Don't" : "Already"} have an account?{" "}
              <Link to={`/${page.toLowerCase()}`}>
                {page.charAt(0) + page.slice(1).toLowerCase()}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AuthenticationForm;
