import React from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import axios from "axios";
import styles from "./Navbar.module.css";
import { setAuth, showFlash } from "../../actions";

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  setAuth: (auth) => dispatch(setAuth(auth)),
  showFlash: (flash) => dispatch(showFlash(flash)),
});

const Navbar = ({ auth, setAuth, showFlash }) => {
  var history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .get("/auth/logout")
      .then((res) => {
        setAuth({ status: false, authUserId: null, admin: false });
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("authUserId", null);
        localStorage.setItem("admin", false);
        showFlash({ status: true, message: res.data });
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
          {auth.status ? (
            <>
              {auth.admin && (
                <Button
                  color="inherit"
                  onClick={() => history.push("/dashboard")}
                >
                  Dashboard
                </Button>
              )}
              <Button color="inherit" onClick={() => history.push("/newpost")}>
                New Post
              </Button>
              <Button color="inherit" onClick={() => history.push("/myblog")}>
                My Posts
              </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
