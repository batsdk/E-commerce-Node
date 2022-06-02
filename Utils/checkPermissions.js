const Errors = require("../errors");

const checkPermission = (reqUser, resourceUserId) => {
  if (reqUser.role === "admin") return;
  if (reqUser.userId === resourceUserId.toString()) return;
  throw new Errors.unauthorized(
    "Does not have permission to access this route"
  );
};

module.exports = checkPermission;
