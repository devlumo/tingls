import cors from "cors";
import "./envConfig.js";

const whitelist = new Set("http://tingls.io");

if (process.env.NODE_ENV === "development") {
  whitelist.add("http://localhost:3000");
  whitelist.add("http://127.0.0.1:3000");
}

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
