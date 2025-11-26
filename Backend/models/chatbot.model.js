import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  chatBotConfig: {
    headerColor: { type: String, default: "#33475B" },
    bgColor: { type: String, default: "#fff" },
    firstMessage: { type: String, default: "Hey!" },
    secondMessage: { type: String, default: "How can I help?" },
    welcomeMessage: { type: String, default: "👋Welcome to Hubly!" },
    introduceHeading: {
      type: String, default: "Introduce Yourself",
    },
    nameLabel: {
      type: String, default: "Your Name",
    },
    emailLabel: {
      type: String, default: "Your Email",
    },
    phoneLabel: {
      type: String, default: "Your Phone",
    }
  },
  missedChatTimer: { type: Number, default: 5 },
}, { timestamps: true });

export default mongoose.model("Settings", settingsSchema);
