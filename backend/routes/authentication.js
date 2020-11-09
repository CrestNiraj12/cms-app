const router = require("express").Router();
const passport = require("../config/passport");

router.post("/register", (req, res, next) => {
  authenticate("register", req, res, next);
});

router.post("/login", (req, res, next) => {
  authenticate("login", req, res, next);
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json("Error while logout!");
    }
    req.logout();
    return res.json("User logged out successfully!");
  });
});

const authenticate = (auth, req, res, next) => {
  passport.authenticate(auth, (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }

    req.login(user, (err) => {
      if (err)
        return res.status(401).json("Username or Password doesnt match!");
      isAuthenticated = true;
      req.session.userId = user._id;

      return res.json({
        message: `${
          auth === "register"
            ? "User successfully registered"
            : "User logged in"
        }!`,
        user: {
          id: user.id,
          email: user.email,
          admin: user.admin,
        },
      });
    });
    req.password = user.password;
  })(req, res, next);
};

module.exports = router;
