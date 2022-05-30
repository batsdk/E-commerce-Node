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
  const { email, password } = req.body;

  if (!email || !password)
    res.status(400).json({ error: "Invalid email or password" });

  const user = await User.findOne({ email });

  if (!user) res.status(401).json({ error: "Can't find the User" });

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword)
    res.status(401).json({ error: "Password does not match" });

  const tokenUser = {
    name: user.name,
    email,
  };

  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 2000),
  });
  res.end();
};

module.exports = { register, login, logout };
