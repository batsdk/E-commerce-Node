const { StatusCodes } = require("http-status-codes");
const User = require("../Models/User");
const Errors = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  checkPermission,
} = require("../Utils");

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
  checkPermission(req.user, user._id);
  res.status(StatusCodes.ACCEPTED).json({ user });
};

// NOT DONE
const showCurrentUser = async (req, res) => {};

// * Update User with User.Save()
// Done
const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    console.log(req.body);
    throw new Errors.BadRequestError("Must provide both email and name");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).end();
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Errors.BadRequestError("Must provide both new and ol passwords");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isValidPassword = await user.comparePassword(oldPassword);

  if (!isValidPassword) {
    throw new Errors.UnauthenticatedError("Wrong Password");
  }

  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).end();
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

// * Updating User with findOneAndUpdate
// DONE
// const updateUserPassword = async (req, res) => {
//   const { oldPassword, newPassword } = req.body;

//   if (!oldPassword || !newPassword) {
//     throw new Errors.BadRequestError("Must provide both new and ol passwords");
//   }

//   const user = await User.findOne({ _id: req.user.userId });

//   const isValidPassword = await user.comparePassword(oldPassword);

//   if (!isValidPassword) {
//     throw new Errors.UnauthenticatedError("Wrong Password");
//   }

//   user.password = newPassword;

//   await user.save();
//   res.status(StatusCodes.OK).end();
// };
