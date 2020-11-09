import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import axios from "axios";
import styles from "./Navbar.module.css";

const Navbar = () => {
  var history = useHistory();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    setAuth(isAuthenticated === "true");
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .get("/auth/logout")
      .then(() => {
        localStorage.setItem("isAuthenticated", false);
        setAuth(false);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.root}>
      <AppBar position="static" className={styles.navbar}>
        <Toolbar style={{ padding: "0" }}>
          <Typography variant="h6" className={styles.title}>
            <Link className={styles.link} to="/">
              CMS App
            </Link>
          </Typography>
          {auth ? (
            <>
              <Button color="inherit">New Post</Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => history.push("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => history.push("/register")}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
