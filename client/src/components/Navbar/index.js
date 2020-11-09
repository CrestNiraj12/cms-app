import React from "react";
import { useHistory, Link } from "react-router-dom";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import styles from "./Navbar.module.css";

const Navbar = () => {
  var history = useHistory();

  return (
    <div className={styles.root}>
      <AppBar position="static" className={styles.navbar}>
        <Toolbar style={{ padding: "0" }}>
          <Typography variant="h6" className={styles.title}>
            <Link className={styles.link} to="/">
              CRM App
            </Link>
          </Typography>
          <Button color="inherit" onClick={() => history.push("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => history.push("/register")}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
