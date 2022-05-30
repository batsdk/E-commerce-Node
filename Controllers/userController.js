const { StatusCodes } = require("http-status-codes");
const User = require("../Models/User");
const Errors = require("../errors");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const user = await User.find({ role: "user" }).select("-password");

  if (!user) throw new Errors.BadRequestError("User not found");

  res.status(StatusCodes.ACCEPTED).json({ user });
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).select("-password");

  if (!user) throw new Errors.NotFoundError("Can not find user");

  res.status(StatusCodes.ACCEPTED).json({ user });
};
const showCurrentUser = async (req, res) => {
  res.send("Show current user");
};
const updateUser = async (req, res) => {
  res.send("Update User");
};
const updateUserPassword = async (req, res) => {
  res.send("Update user password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
