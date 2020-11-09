const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("./backend/config/passport");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/public")));

const usersRouter = require("./backend/routes/users");
const authenticationRouter = require("./backend/routes/authentication");

mongoose
  .connect(process.env.CONNECTION_URL, {
    auth: {
      user: process.env.ATLAS_USER,
      password: process.env.ATLAS_PASS,
    },
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err));

const connection = mongoose.connection;

const sessionStore = {
  name: "authSession",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true },
  store: new MongoStore({
    mongooseConnection: connection,
    secret: process.env.STORE_SECRET,
    ttl: 24 * 60 * 60 * 1000,
    autoRemove: "interval",
    autoRemoveInterval: 10,
  }),
};

app.use(session(sessionStore));
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", usersRouter);
app.use("/auth", authenticationRouter);

connection
  .once("open", () => console.log("Established database connection!"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server running on port: ${port}`));
