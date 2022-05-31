const { StatusCodes } = require("http-status-codes");
const User = require("../Models/User");
const Errors = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../Utils");

// Done
const getAllUsers = async (req, res) => {
  console.log(req.user);
  const user = await User.find({ role: "user" }).select("-password");

  if (!user) throw new Errors.BadRequestError("User not found");

  res.status(StatusCodes.ACCEPTED).json({ user });
};

// Done
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).select("-password");

  if (!user) throw new Errors.NotFoundError("Can not find user");

  res.status(StatusCodes.ACCEPTED).json({ user });
};

// NOT DONE
const showCurrentUser = async (req, res) => {};

// In Progress
const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    throw new Errors.BadRequestError("Must provide both email and name");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { name, email },
    { new: true, runValidators: true }
  );

  if (!user) {
    console.log(req.user);
    console.log(user == null);
    console.log(user);
    throw new Errors.BadRequestError("Invalid User Cookie");
  }

  const tokenUser = {
    name: "user.name",
    userId: "user._id",
    role: "user.role",
  };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// Done
const updateUserPassword = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Still In development.." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
