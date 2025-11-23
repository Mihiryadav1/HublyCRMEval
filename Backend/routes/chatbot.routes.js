import { Router } from "express";
import { getChatbotConfig, saveChatbotConfig } from "../controllers/chatbot.controller.js";

const chatbotRoutes = Router();

chatbotRoutes.get("/", getChatbotConfig);
chatbotRoutes.post("/chatbotconfig", saveChatbotConfig);

export default chatbotRoutes;
