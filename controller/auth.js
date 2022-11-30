import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const register = async (request, response, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(request.body.password, salt);
    const newUser = new User({
      ...request.body,
      password: hashPassword,
    });
    await newUser.save();
    response.status(200).json("User has been created Successfully!");
  } catch (error) {
    next(error);
  }
};

export const login = async (request, response, next) => {
  try {
    const user = await User.findOne({ username: request.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong username or password!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    response
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 86400000,
      })
      .status(200)
      .json({details:{...otherDetails}, isAdmin });
  } catch (error) {
    next(error);
  }
};
