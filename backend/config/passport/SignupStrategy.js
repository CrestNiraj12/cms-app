const User = require("../../models/user.model");
const LocalStrategy = require("passport-local").Strategy;

const SignupStrategy = new LocalStrategy(
  { passReqToCallback: true, usernameField: "email" },
  (req, email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err, null);
      if (user) return done("User already exists!", null);
      const newUser = new User({
        fullname: req.body.fullname,
        email,
        password,
        admin: req.body.admin,
      });

      newUser.save((err, data) => {
        if (err) return done(err, null);
        return done(null, data);
      });
    });
  }
);

module.exports = SignupStrategy;
