const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    uniqueId: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    createdAt: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a"),
    },
  },
  { versionKey: false }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.statics.checkUser = async function (username) {
  try {
    const user = await this.findOne({ username: username });
    if (user) return true;

    return false;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username: username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
  }
  throw new Error("The user information does not match in our system.");
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
