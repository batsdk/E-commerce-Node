const { StatusCodes } = require("http-status-codes");
const User = require("../Models/User");
const Errors = require("../errors");

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
const updateUser = async (req, res) => {
  res.send("Update User");
};

// NOT DONE
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Errors.UnauthenticatedError(
      "Please enter both old and new passwords"
    );
  }

  const user = await User.findOne({
    _id: req.user.userId,
  });

  const validPassword = await user.comparePassword(oldPassword);

  if (!validPassword) {
    throw new Errors.unauthorized("Invalid Credentials");
  }

  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.ACCEPTED).json({});
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
