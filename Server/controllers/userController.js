const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("your input data is invalid");
    error.statusCode = 400;
    return next(error);
  }
  const { name, email, password } = req.body;

  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      const error = new Error("this email have already an account");
      error.statusCode = 406;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ name, email, password: hashedPassword });
  let createdUser;
  try {
    createdUser = await newUser.save();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
  const token = jwt.sign(
    { userId: createdUser.id, email: createdUser.email },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "1h" }
  );
  //res.setHeader("Authorization","Bearer "+token);
  return res.status(200).json({
    message: "created successfully",
    user: createdUser.toObject({ getters: true }),
    token
  });
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("your input data is invalid");
    error.statusCode = 400;
    return next(error);
  }

  const { email, password } = req.body;
  let existUser;
  try {
    existUser = await User.findOne({ email: email });
    if (!existUser) {
      const error = new Error("email does not exist");
      error.statusCode = 406;
      throw error;
    }
    const pwdIsValid = await bcrypt.compare(password, existUser.password);
    if (!pwdIsValid) {
      const error = new Error("invalid password");
      error.statusCode = 402;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
  const token = jwt.sign(
    { userId: existUser.id, email: existUser.email },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "1h" }
  );
  //res.setHeader("Authorization","Bearer "+token);
  return res.status(201).json({
    message: "logged in successfuly",
    userId: existUser.toObject({ getters: true }).id,
    token
  });
};
