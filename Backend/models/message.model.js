import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    sender: {
        type: String,
        enum: ["user", "team"],
        required: true
    },
    text: { type: String, required: true },
    missed: {
        type: Boolean,
        default: false,
    },
    expiresAt: {
        type: Date,
    },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
