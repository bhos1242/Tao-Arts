import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is already Connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "TaoArts_Admin",
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error: any) {
    console.log("Error connecting to MongoDB", error.message);
  }
};
