import User from "../models/userModel.js";

const login = (req, res, next) => {
  // 1. Get user login information

  const { email, password } = req.body;

  // 2. Check that user exists and passwords match

  // 3. Check if session already exists

  // 4. Initialise new session

  req.session.user = "Luke";
  // 5. Send response without disclosing sensitive info
  res.status(200).json({
    success: true,
    message: "Logged in",
    email,
    password,
    session: req.session,
  });
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
    req.session.userID = newUser._id;

    // 3. Send response
    res.status(200).json({
      success: true,
      message: "Your account has been created",
    });
  } catch (error) {
    console.log(error);
  }
};

export { login, signup };
