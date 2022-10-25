import mongoose from "mongoose";

export const dbConnection = () =>
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) {
        console.log("connected to db");
      } else {
        console.log("error: ", err);
      }
    }
  );
