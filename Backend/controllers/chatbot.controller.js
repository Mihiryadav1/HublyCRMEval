import Settings from "../models/chatbot.model.js"
export const saveChatbotConfig = async (req, res) => {
    try {
        const { headerColor, bgColor, firstMessage, secondMessage, welcomeMessage, emailLabel, phoneLabel, nameLabel, introduceHeading } = req.body;

        let settings = await Settings.findOne();

        if (!settings) {
            settings = new Settings();
        }

        settings.chatBotConfig = {
            headerColor,
            bgColor,
            firstMessage,
            secondMessage,
            welcomeMessage,
            nameLabel,
            emailLabel,
            phoneLabel,
            introduceHeading
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

//Missed Chat Timer 
export const updateMissedChatTimer = async (req, res) => {
    try {
        const { timerInMinutes } = req.body; 
        if (typeof timerInMinutes !== "number" || timerInMinutes < 0) {
            return res.status(400).json({ message: "Invalid timer format" });
        }

        const settings = await Settings.findOne();
        if (!settings) {
            // Create first document if none exists
            const newSettings = await Settings.create({ missedChatTimer: timerInMinutes });
            return res.status(200).json({
                message: "Timer saved successfully",
                settings: newSettings,
            });
        }

        settings.missedChatTimer = timerInMinutes;
        await settings.save();

        res.status(200).json({
            message: "Timer updated successfully",
            settings,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
