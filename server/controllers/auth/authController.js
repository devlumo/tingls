import User from "../../models/userModel.js";

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

    req.session.userData = {
      username: user.userName,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      userData: req.session.userData,
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
    req.session.userData = {
      username: newUser.userName,
      email: newUser.email,
    };

    // 3. Send response
    res.status(200).json({
      success: true,
      userData: req.session.userData,
      message: "Your account has been created",
    });
  } catch (error) {
    console.log(error);
    return next(new Error("Something went wrong"));
  }
};

export { login, signup };
