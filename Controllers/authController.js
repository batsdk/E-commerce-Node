const User = require("../Models/User");
const { StatusCodes } = require("http-status-codess");
const CustomError = require("../errors");

const register = async (req, res) => {
  const user = await User.create(req.body);
};
const login = async (req, res) => {
  res.send("login works");
};
const logout = async (req, res) => {
  res.send("logout works");
};

module.exports = { register, login, logout };
