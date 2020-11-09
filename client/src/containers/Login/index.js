import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <Container className={styles.container} maxWidth="xs">
      <Typography variant="h4" color="textSecondary" align="center">
        Welcome
      </Typography>
      <form>
        <Grid container spacing={3} style={{ marginTop: "50px" }}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
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
            >
              Log in
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{ fontSize: 12 }}
              variant="body1"
              color="textSecondary"
              align="center"
            >
              Don't have an account? <Link to="/register">Register</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
