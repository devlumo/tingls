import cors from "cors";

const whitelist = new Set(["http://localhost:3000", "http://127.0.0.1:3000"]);

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export default cors(corsOptions);
