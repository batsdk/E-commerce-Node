const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a Name"],
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Must provide an Email Address"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  passwprd: {
    type: String,
    required: [true, "Must provide a password"],
    minLength: 8,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
