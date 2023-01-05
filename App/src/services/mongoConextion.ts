import mongoose from "mongoose";
import config from "../config/config";

const mongoConnection = async () => {
  try {
    await mongoose.connect(config.mongoConfig.url, {
      dbName: config.mongoConfig.dbName,
    });
    console.log("Connected to mongo");
  } catch (err) {
    console.log(err);
  }
};

export default mongoConnection;
