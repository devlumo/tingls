const getSession = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userData) {
      next(new Error("You are not logged in"));
    }

    res.status(200).json({
      userData: req.session.userData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default getSession;
