import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = () => {
  const uri = "mongodb://localhost:27017";
  if (!uri) {
    console.error("MongoDB URI is not defined. Check your .env file.");
    return;
  }

  mongoose
    .connect(uri, { dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM" })
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.log("Error connecting to database:", err));
};
