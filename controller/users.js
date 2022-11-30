import User from "../models/User.js";


export const updateUsers = async (request, response, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
export const deleteUsers = async (request, response, next) => {
  try {
    await User.findByIdAndDelete(request.params.id);
    response.status(200).json("User has been deleted Successfully");
  } catch (error) {
    next(error);
  }
};
export const getUsers = async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const getAllUsers = async (request, response, next) => {
  // const failed = true;

  // if (failed) return next(createError(401, "You are not authenticated!"));
  try {
    const users = await User.find();
    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
