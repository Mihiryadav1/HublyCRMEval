import Message from "../models/message.model.js";
import Ticket from "../models/ticket.model.js";

export const addMessageToTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const { text } = req.body;

        // Find ticket by custom ticketId
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        const newMessage = new Message({
            ticketId: ticket._id,
            senderId: req.user.userId,
            text,

        });

        await newMessage.save();

        res.status(201).json({
            message: "Message added",
            chat: newMessage,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllMessages = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        //Find Actual Ticket
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        //Find message using internal ObjectId
        const messages = await Message.find({ ticketId: ticket._id })
            .sort({ timestamp: 1 })
            .populate("senderId", "name email");

        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
