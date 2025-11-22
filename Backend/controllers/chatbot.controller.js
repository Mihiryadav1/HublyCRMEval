import Settings from "../models/chatbot.model.js"
export const saveChatbotConfig = async (req, res) => {
    try {
        const { headerColor, bgColor, firstMessage, secondMessage, welcomeMessage } = req.body;

        let settings = await Settings.findOne();

        if (!settings) {
            settings = new Settings();
        }

        settings.chatBotConfig = {
            headerColor,
            bgColor,
            firstMessage,
            secondMessage,
            welcomeMessage
        };

        await settings.save();

        res.json({ success: true, settings });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
