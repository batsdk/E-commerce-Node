const Errors = require("../errors");
const { verifyToken } = require("../Utils/jwt");

const authMiddleware = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new Errors.UnauthenticatedError("Invalid Authentication");
  }

  try {
    const { userId, name, role } = verifyToken(token);
    req.user = {
      userId,
      name,
      role,
    };
  } catch (error) {
    console.log(error);
  }

  next();
};

module.exports = { authMiddleware };
