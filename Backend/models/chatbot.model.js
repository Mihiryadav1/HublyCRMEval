import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  chatBotConfig: {
    headerColor: { type: String, default: "#33475B" },
    bgColor: { type: String, default: "#fff" },
    firstMessage: { type: String, default: "" },
    secondMessage: { type: String, default: "" },
    welcomeMessage: { type: String, default: "👋Welcome to Hubly!" },
  },
  missedChatTimer: { type: Number, default: 5 },
}, { timestamps: true });

export default mongoose.model("Settings", settingsSchema);
