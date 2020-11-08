const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/public")));

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

connection
  .once("open", () => console.log("Established database connection!"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server running on port: ${port}`));
