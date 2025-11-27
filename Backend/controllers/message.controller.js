import Message from "../models/message.model.js";
import Ticket from "../models/ticket.model.js";
import Settings from "../models/chatbot.model.js"

//For Users
export const addMessageToTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const { text } = req.body;
        console.log(req.user)
        // Find ticket by custom ticketId
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // 🔥 Get SLA time from Settings
        const settings = await Settings.findOne();
        const SLA_MINUTES = settings?.missedChatTimer || 10;
        const SLA_MS = SLA_MINUTES * 60 * 1000;


        const newMessage = new Message({
            ticketId: ticket._id,
            sender: "user",
            senderId: null,
            text,
            expiresAt: new Date(Date.now() + SLA_MS),
            missed: false
        });
        console.log(newMessage, 'newmessage')

        await newMessage.save();

        res.status(201).json({
            message: "Message added",
            chat: newMessage,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const addMessageToTicketForTeam = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const { text } = req.body;
        console.log(req.user)
        // Find ticket by custom ticketId
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        const lastUserMsg = await Message.findOne({
            ticketId: ticket._id,
            sender: "user",
            missed: false,
            expiresAt: { $exists: true }
        }).sort({ createdAt: -1 });

        const newMessage = new Message({
            ticketId: ticket._id,
            sender: "team",
            senderId: req.user.userId,
            text,

        });
        console.log(newMessage, 'newmessage')

        await newMessage.save();
        if (lastUserMsg) {
            const replyIsLate = Date.now() > lastUserMsg.expiresAt.getTime();
            if (replyIsLate) {
                lastUserMsg.missed = true;
                await lastUserMsg.save();
            }
        }
        res.status(201).json({
            message: "Message added",
            chat: newMessage,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get messages for TicketID
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

//Missed chats
export const getWeeklyMissedChats = async (req, res) => {
    try {
        const missedMessages = await Message.find({ missed: true }).sort({ createdAt: 1 });

        const weekMap = {};
        const getWeekId = (date) => {
            const d = new Date(date);
            const oneJan = new Date(d.getFullYear(), 0, 1);
            const week = Math.ceil((((d - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
            return `${d.getFullYear()}-W${week}`;
        };

        missedMessages.forEach((msg) => {
            const weekId = getWeekId(msg.createdAt);
            if (!weekMap[weekId]) weekMap[weekId] = 0;
            weekMap[weekId]++;
        });

        const result = Object.keys(weekMap)
            .sort((a, b) => {
                const [yearA, weekA] = a.split('-W').map(Number);
                const [yearB, weekB] = b.split('-W').map(Number);
                return yearA - yearB || weekA - weekB;
            })
            .slice(-10)
            .map((week, index) => ({
                week: index + 1,
                missed: weekMap[week],
            }));


        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const getAverageReplyTime = async (req, res) => {
    try {
        // Sort by ticket and time so we can walk in order
        const messages = await Message.find().sort({ ticketId: 1, createdAt: 1 });

        // Map: ticketId -> first customer message time
        const firstCustomerTime = new Map();
        // Map: ticketId -> first reply time in minutes
        const firstReplyTimes = new Map();

        for (const msg of messages) {
            const ticketId = msg.ticketId.toString();

            if (msg.sender === "user") {
                // Save first customer time per ticket (only once)
                if (!firstCustomerTime.has(ticketId)) {
                    firstCustomerTime.set(ticketId, msg.createdAt);
                }
            }

            if (msg.sender === "team") {
                // If we already have first customer time and we don't yet
                // have a reply recorded for this ticket, this is the first reply
                if (
                    firstCustomerTime.has(ticketId) &&
                    !firstReplyTimes.has(ticketId)
                ) {
                    const diffMs = msg.createdAt - firstCustomerTime.get(ticketId);
                    const diffMinutes = diffMs / 60000;
                    firstReplyTimes.set(ticketId, diffMinutes);
                }
            }
        }

        const replyTimes = Array.from(firstReplyTimes.values());

        const avg =
            replyTimes.length > 0
                ? replyTimes.reduce((a, b) => a + b, 0) / replyTimes.length
                : 0;
        const avgMinutes =
            replyTimes.length > 0
                ? replyTimes.reduce((a, b) => a + b, 0) / replyTimes.length
                : 0;

        const avgSeconds = (avgMinutes * 60).toFixed(2);

        res.json({ success: true, avgReplyTimeMinutes: avg, avgTimeSeconds: avgSeconds });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
