const config = require("../configuration/config.json");
const User = require("../models/User");
const { v4 } = require("uuid");
const { mailOptions } = require("../configuration/emailHandler");
const { validate } = require("email-validator");
const { containsSpecialChars } = require("../utils/checkCharacters");

const handleErrors = (err) => {
  //When creating a new function and uses handleErrors(), always use these 2 functions to see the occuring error.
  console.log(err.message);
  console.log(err.code);

  let errors = "";

  if (err.message === "Fill out the fields!") {
    errors = "Fill out the fields!";
  }

  if (
    err.message === "The username or password does not match in our system!"
  ) {
    errors = "The username or password does not match in our system!";
  }

  if (err.message === "Password does not match!") {
    errors = "Password does not match!";
  }

  if (err.message === "Please enter a correct email.") {
    errors = "Please enter a correct email.";
  }

  if (err.message === "User already exists in the system!") {
    errors = "User already exists in the system!";
  }

  if (err.message === "User does not exists!") {
    errors = "User does not exists!";
  }

  if (err.message === "The password must be minimum of 6 characters!") {
    errors = "The password must be minimum of 6 characters!";
  }

  if (err.message === "The username must not contain a special character!") {
    errors = "The username must not contain a special character!";
  }

  if (err.message === "The user information does not match in our system.") {
    errors = "The user information does not match in our system.";
  }

  if (
    err.message === "The username must not exceed the maximum of 32 characters!"
  ) {
    errors = "The username must not exceed the maximum of 32 characters!";
  }

  if (err.message.includes("Error:")) {
    Object.values(err.errors).forEach((properties) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.checkUser(username);

    if (!userExists) {
      throw new Error("User does not exists!");
    }

    if (!username || !password) {
      throw new Error("Fill out the fields!");
    }

    const user = await User.login(username, password);

    res.status(200).json({
      uniqueId: user.uniqueId,
      username: user.username,
    });
    next();
  } catch (e) {
    res.status(400).json({ errors: handleErrors(e) });
    next();
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const userExists = await User.checkUser(username);

    if (!username || !email || !password || !confirmPassword) {
      throw new Error("Fill out the fields!");
    }

    if (!validate(email)) {
      throw new Error("Please enter a correct email.");
    }

    if (containsSpecialChars(username)) {
      throw new Error("The username must not contain a special character!");
    }

    if (password !== confirmPassword) {
      throw new Error("Password does not match!");
    }

    if (username.length > 32) {
      throw new Error(
        "The username must not exceed the maximum of 32 characters!"
      );
    }

    if (password.length < 6) {
      throw new Error("The password must be minimum of 6 characters!");
    }

    if (userExists) {
      throw new Error("User already exists in the system!");
    }

    const uuid = v4();
    const user = await User.create({
      uniqueId: uuid,
      username: username,
      email: email,
      password: password,
      lastIPLogin: req.clientIp,
      verifiedLogin: true,
    });

    mailOptions({
      from: config.MAIL_CREDENTIALS.MAIL_USER,
      to: email,
      subject: `Account Registered`,
      html: `Thank you for registering to the website, ${username}!`,
    });


    res.status(201).json({
      uniqueId: user.uniqueId,
      username: user.username,
    });
    next();
  } catch (e) {
    res.status(400).json({ errors: handleErrors(e) });
    next();
  }
};

exports.contact = async (req, res, next) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      throw new Error("Fill out the fields!");
    }

    if (!validate(email)) {
      throw new Error("Please enter a correct email.");
    }

    mailOptions({
      from: config.MAIL_CREDENTIALS.MAIL_USER,
      to: email,
      subject: `${subject} - Contact support`,
      html: `<span>Email: <b>${email}</b><br>Subject: <b>${subject}</b><br>Message: <b>${message}</b></span><br><span><p>Please reply back at this email.</p></span>`,
    });

    res.status(200).json({ data: "Email sent successfully." });
    next();
  } catch (e) {
    res.status(400).json({ errors: handleErrors(e) });
    next();
  }
};
