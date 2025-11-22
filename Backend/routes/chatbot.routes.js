import { Router } from "express";
import { saveChatbotConfig } from "../controllers/chatbot.controller.js";

const chatbotRoutes = Router();

chatbotRoutes.post("/chatbotconfig", saveChatbotConfig);

export default chatbotRoutes;
