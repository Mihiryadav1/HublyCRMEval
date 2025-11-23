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


export const getChatbotConfig = async (req, res) => {
    try {
        const chatConfig = await Settings.findOne({});
        if (!chatConfig) {
            return res.status(404).json({
                message: "Chatbot settings not found",
                success: false
            });
        }
        console.log(chatConfig.chatBotConfig)
        res.status(200).json({
            message: "Chatbot settings fetched",
            chatConfig,
            successs: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching chatbot config",
            error: error.message
        })
    }
}