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

export { login };
