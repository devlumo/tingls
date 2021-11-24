import "./utils/envConfig.js";
import app from "./app.js";

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
  console.log("Connected to DB");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
