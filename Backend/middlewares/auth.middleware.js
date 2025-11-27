import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

export const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "No Token Provided",
            success: false
        })
    }

    const token = authHeader.split(" ")[1];
    try {
        //verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        // Find user in DB
        const user = await User.findById(decodedToken.userId);
        if (user.passwordUpdatedAt && decodedToken.iat * 1000 < user.passwordUpdatedAt.getTime()) {
            return res.status(401).json({
                message: "Password updated — please login again",
                success: false
            });
        }

        req.user = decodedToken;
        next();

    } catch (error) {
        console.log("JWT Verification Error: ", error.message)
        return res.status(401).json({ message: "Invalid Token", success: false })
    }
}