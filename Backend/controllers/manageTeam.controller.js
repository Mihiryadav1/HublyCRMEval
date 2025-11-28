import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import Ticket from "../models/ticket.model.js"
//Create Team Members
export const createTeamMember = async (req, res) => {
    try {
        //Only admin can create team members
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admin can create team members." });
        }
        const { name, email, role, phone = "321" } = req.body;

        //Fields validation
        if (!name || !email || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //Check if user exists already
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }
        //Hash Password
        const hashedPassword = await bcrypt.hash(email, 10);

        //Create new team member
        const teamMember = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            phone
        });
        // Remove password from response
        await teamMember.save();

        res.status(201).json({
            message: "Team member created successfully",
            password: email
        })

    } catch (error) {
        res.status(500).json({
            message: "Error creating team member",
        })
    }
}

//Get All Team Members
export const getTeamMembers = async (req, res) => {
    try {

        //Only admin can view team members
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admin can view team members." });
        }
        const teamMembers = await User.find({ role: { $ne: "admin" } }).select("-password");
        res.status(200).json({
            message: "Team members fetched successfully",
            teamMembers
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching team members",
            error: error.message
        });
    }
}

// Delete Team Members
export const deleteTeamMember = async (req, res) => {
    try {
        const { memberId } = req.params

        //Only admin can delete team members
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        //Check if member exists
        const member = await User.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: "Team member not found" });
        }
        //Prevent Deleting Admin
        if (member.role === "admin") {
            return res.status(403).json({ message: "Cannot delete admin" });
        }
        const fallbackAdminId = req.user.userId;

        // Reassign all tickets that were assigned to this member
        await Ticket.updateMany(
            { assignedTo: memberId },
            { assignedTo: fallbackAdminId }
        );
        await User.findByIdAndDelete(memberId);

        res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting team member",
            error: error.message
        });
    }
}

//Update Team Member Roles
export const updateTeamMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { name, email, password, role } = req.body;

        //Only admin can update the roles
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied: Admins only" })
        }

        //Check if member exists
        const memberToUpdate = await User.findById(memberId);
        if (!memberToUpdate) {
            return res.status(404).json({ message: "Team member not found" });
        }

        //Update Role
        memberToUpdate.name = name;
        memberToUpdate.role = role;
        memberToUpdate.email = email;
        //Hash incoming password
        if (password && password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(password, 10);
            memberToUpdate.password = hashedPassword;
        }
        await memberToUpdate.save()

        res.status(200).json({
            message: "Successfully updated team member details",
            memberToUpdate
        })

    } catch (error) {
        res.status(500).json({
            message: "Error updating team member role",
            error: error.message
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Check if email belongs to someone else
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = await User.findById(userId);

        // Build full name safely, fallback to existing
        let fullName;
        if (!firstName && !lastName) {
            fullName = user.name; // keep old name
        } else {
            fullName = [firstName, lastName].filter(Boolean).join(" ");
        }

        // Name required for schema
        if (!fullName.trim()) {
            return res.status(400).json({ message: "Name is required" });
        }
        // if (!password || !confirmPassword) {
        //     return res.status(400).json({ message: "Password is required" });
        // }

        // Password mismatch
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Both passwords must match" });
        }

        const updateData = {
            name: fullName,
            email
        };
        let passwordChanged = false;

        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 10);
            updateData.passwordUpdatedAt = new Date();
            passwordChanged = true
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        res.json({
            message: "Profile updated successfully",
            user: updatedUser,
            passwordChanged
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating profile",
            error: error.message
        });
    }
};

