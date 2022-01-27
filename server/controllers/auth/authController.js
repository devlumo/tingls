import User from "../../models/userModel.js";
import ApiError from "../../utils/ApiError.js";

const login = async (req, res, next) => {
  try {
    if (req.session.userName) {
      return next(new ApiError("You are already logged in", 400));
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError("Provide a valid email or password", 401));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new ApiError("Email or Password is incorrect", 401));
    }

    req.session.userData = {
      username: user.userName,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      userData: req.session.userData,
      ip: req.socket.remoteAddress,
      proxyIp: `helo${req.headers["x-forwarded-for"]}`,
      message: "Logged in successfully",
    });
  } catch (error) {
    return next(new ApiError("Something went wrong", 400));
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
    return next(new ApiError("Something went wrong"));
  }
};

export { login, signup };
