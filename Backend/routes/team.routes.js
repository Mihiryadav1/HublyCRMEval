import { Router } from "express";
import { createTeamMember, deleteTeamMember, getTeamMembers, updateProfile } from "../controllers/manageTeam.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const teamRoutes = Router();

teamRoutes.get("/", isAuthenticated, getTeamMembers);
teamRoutes.post("/createMember", isAuthenticated, createTeamMember);
teamRoutes.put("/myprofile", isAuthenticated, updateProfile)
teamRoutes.delete("/:memberId", isAuthenticated, deleteTeamMember)

export default teamRoutes;
