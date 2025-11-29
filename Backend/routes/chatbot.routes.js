import { Router } from "express";
import { getChatbotConfig, saveChatbotConfig, updateMissedChatTimer } from "../controllers/chatbot.controller.js";

const chatbotRoutes = Router();

chatbotRoutes.get("/", getChatbotConfig);
chatbotRoutes.post("/chatbotconfig", saveChatbotConfig);
chatbotRoutes.post("/updateMissedTime", updateMissedChatTimer);

export default chatbotRoutes;
