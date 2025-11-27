import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false,
        },

        profileImage: {
            type: String,
            default: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        passwordUpdatedAt: {
            type: Date,
            default: null,
        }

    },
    { timestamps: true }
);




const User = mongoose.model("User", userSchema);
export default User;
