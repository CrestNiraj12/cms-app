const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

userSchema.methods = {
  hashPassword: (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),
  checkPassword: function (password) {
    if (password !== undefined)
      return bcrypt.compareSync(password, this.password);
  },
};

userSchema.pre("save", function (next) {
  if (!this.password) {
    console.log("=======NO PASSWORD PROVIDED=======");
    next();
  } else {
    if (!this.isModified("password")) return next();
    console.log("hashPassword in pre save");
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
