import { Router } from "express";
import { getAvgReplyTime } from "../controllers/analytics.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const analyticsRoutes = Router();

analyticsRoutes.get("/avgReplyTime", isAuthenticated, getAvgReplyTime);
// analyticsRoutes.get("/missedChats", isAuthenticated, getMissedChats);

export default analyticsRoutes;
