import Settings from "../models/chatbot.model.js";

export const seedSettings = async () => {
  try {
    const existing = await Settings.findOne();
    if (!existing) {
      await Settings.create({
        chatBotConfig: {
          headerColor: "#33475B",
          bgColor: "#fff",
          firstMessage: "Hey!",
          secondMessage: "How can I help?",
          welcomeMessage: "👋Welcome to Hubly!",
        },
        missedChatTimer: 5,
      });

      console.log("Default settings seeded.");
    } else {
      console.log("Settings already exist. Skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding settings:", error);
  }
};
