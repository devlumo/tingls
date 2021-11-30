import redisClient from "../../database/redisConfig.js";

const getSession = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userName) {
      next(new Error("You are not logged in"));
    }

    console.log(req.session.userName);

    res.status(200).json({
      userName: req.session.userName,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default getSession;
