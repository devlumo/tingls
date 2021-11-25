import User from "../models/userModel.js";

/*
  TODO:
  - Add new protect feature for premium check
  - Add new protect feature for ID / Role check
*/

const login = async (req, res, next) => {
  try {
    if (req.session.userName) {
      return next(new Error("You are already logged in"));
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error("Provide a valid email or password"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new Error("Email or Password is incorrect"));
    }

    req.session.userName = user.userName;

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const signup = async (req, res, next) => {
  try {
    // 1. Try and insert new user
    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
    });

    // 2. Create session to log the user in
    req.session.userName = newUser.userName;

    // 3. Send response
    res.status(200).json({
      success: true,
      message: "Your account has been created",
    });
  } catch (error) {
    console.log(error);
    return next(new Error("Something went wrong"));
  }
};

const protect = (req, res, next) => {
  if (!req.session || !req.session.userName) {
    return next(new Error("Please login to view this content"));
  }
  next();
};

export { login, signup, protect };
