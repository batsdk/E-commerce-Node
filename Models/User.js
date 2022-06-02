const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a Name"],
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Must provide an Email Address"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  password: {
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

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified("name"));

  // ! when using the user.save() it encrypt the password again and it is not good practice

  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePw) {
  const pw = await bcrypt.compare(candidatePw, this.password);

  return pw;
};

module.exports = mongoose.model("User", UserSchema);
