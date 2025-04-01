import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in environment variables");
}

const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return; // If already connected, return
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: "yourDatabaseName", // Change to your actual DB name
      useNewUrlParser: true, // Not needed in Mongoose 6+
      useUnifiedTopology: true, // Not needed in Mongoose 6+
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectToDatabase;
