import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, "username is required"],
    maxLength: [8, "username length cannot be greater than 8 characters"],
    minLength: [3, "username cannot be less than 3 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "username is required"],
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "username is required"],
    select: false, // won't show up in any output
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
    maxLength: [16, "first name length cannot be greater than 16 characters"],
    minLength: [2, "first name cannot be less than 2 characters"],
  },
  lastName: {
    type: String,
    required: [true, "surname is required"],
    maxLength: [16, "surname length cannot be greater than 16 characters"],
    minLength: [2, "surname cannot be less than 2 characters"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  premium: false,
});

userSchema.pre("save", function (next) {
  this.dateCreated = Date.now();
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
