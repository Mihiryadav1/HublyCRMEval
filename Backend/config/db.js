
import mongoose from "mongoose";
import { seedSettings } from "../seed/chatbot.js";

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB successfully");
        await seedSettings();
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
