import mongoose from "mongoose";
import config from "../config/config";

export default async function conectToMongo() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.mongoConfig.url);
    console.log("Conected to mongo", config.mongoConfig.url);
  } catch (err) {
    console.log(err);
  }
}
