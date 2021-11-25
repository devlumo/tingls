import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

/*
  TODO:
  - Check username for badwords
  - 
*/

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, "username is required"],
      maxLength: [10, "username length cannot be greater than 10 characters"],
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
  },
  { timestamps: true }
);

// MIDDLEWARES

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// INSTANCE METHODS

userSchema.methods.checkPassword = async function (
  candidatePassword,
  actualPassword
) {
  const isCorrect = await bcrypt.compare(candidatePassword, actualPassword);
  return isCorrect;
};

const User = mongoose.model("User", userSchema);

export default User;
