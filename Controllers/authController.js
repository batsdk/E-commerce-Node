const { StatusCodes } = require("http-status-codes");
const User = require("../Models/User");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../Utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailInUse = await User.findOne({ email: email });

  if (emailInUse) {
    throw new CustomError.BadRequestError(
      "Can not register user with an existing email address"
    );
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };

  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
const login = async (req, res) => {
  res.send("login works");
};
const logout = async (req, res) => {
  res.send("logout works");
};

module.exports = { register, login, logout };
