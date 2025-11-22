
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import User from "../models/users.model.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let role
        // Check if admin  already exists
        const existingAdmin = await User.findOne({ role: "admin" });

        //Decide first user as admin
        if (!existingAdmin) {
            role = "admin"
        }
        else {
            //only admin can create additional users
            if (!req.user || req.user.role !== "admin") {
                return res.status(403).json({
                    message: "Only admin can create team members."
                });
            }
            role = "user"
        }

        //Hash password  
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin user
        const adminUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        })
        await adminUser.save()
        res.status(201).json({
            message: "Account created successfully",
            adminUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                message: "Name and password are required",
                success: false
            });
        }

        // Ask MongoDB to include password
        const existingUser = await User.findOne({ name }).select("+password");

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPassValid = await bcrypt.compare(password, existingUser.password);

        if (!isPassValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login Successful",
            user: existingUser,
            success: true,
            token
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error Logging in",
            error: err.message
        });
    }
};
