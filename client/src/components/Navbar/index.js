import React from "react";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.root}>
      <AppBar position="static" className={styles.navbar}>
        <Toolbar style={{ padding: "0" }}>
          <Typography variant="h6" className={styles.title}>
            CRM App
          </Typography>
          <Button color="inherit">New Post</Button>
          <Button color="inherit">Create News</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
