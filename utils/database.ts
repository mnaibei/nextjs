import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: "shareprompt",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    isConnected = true;
    console.log("database connected");
  } catch (error) {
    console.log("error connecting to database", error);
  }
};
