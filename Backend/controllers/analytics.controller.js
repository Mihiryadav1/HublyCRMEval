import Ticket from "../models/ticket.model.js";
import Message from "../models/message.model.js";

// Helper to get week number
const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
};

export const getAvgReplyTime = async (req, res) => {
    try {
        const tickets = await Ticket.find();

        let weeklyData = {};

        for (const ticket of tickets) {

            const messages = await Message.find({ ticketId: ticket._id })
                .sort({ createdAt: 1 });

            if (!messages.length) continue;

            // Go through all messages & find all (user → team reply) pairs
            for (let i = 0; i < messages.length; i++) {

                const userMsg = messages[i];

                // Only process user messages
                if (userMsg.sender !== "user") continue;

                // Find the next team reply after this user message
                const teamReply = messages.slice(i + 1).find(
                    m => m.sender === "team" && m.createdAt > userMsg.createdAt
                );

                if (!teamReply) continue;

                // Time difference in seconds
                const diffSeconds =
                    (new Date(teamReply.createdAt) - new Date(userMsg.createdAt)) / 1000;

                // Week number based on WHEN the user message was sent
                const week = getWeekNumber(userMsg.createdAt);

                // Save to weekly bucket
                if (!weeklyData[week]) weeklyData[week] = [];
                weeklyData[week].push(diffSeconds);
            }
        }

        // Convert grouped seconds into weekly averages
        const weeklyAverages = Object.entries(weeklyData).map(([week, arr]) => {
            const avgSec = arr.reduce((a, b) => a + b, 0) / arr.length;

            return {
                week: Number(week),
                avgReplySeconds: Number(avgSec.toFixed(2)),
                avgReplyMinutes: Number((avgSec / 60).toFixed(2)),
                totalConversations: arr.length
            };
        });

        // Sort week-wise and take last 10
        const last10Weeks = weeklyAverages
            .sort((a, b) => a.week - b.week)
            .slice(-10);

        return res.json({
            success: true,
            totalWeeks: last10Weeks.length,
            data: last10Weeks
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// export const getMissedChats = async (req, res) => {

//     try {
//         const tickets = await Ticket.find();
//         let weeklyData = {};

//         for (const ticket of tickets) {
//             const messages = await Message.find({ ticketId: ticket._id }).sort({ createdAt: 1 });
//             if (!messages.length) continue;

//             for (let i = 0; i < messages.length; i++) {
//                 const userMsg = messages[i];
//                 if (userMsg.sender !== "user") continue;

//                 // Find next team reply
//                 const teamReply = messages.slice(i + 1).find(
//                     m => m.sender === "team" && m.createdAt > userMsg.createdAt
//                 );

//                 let isMissed = false;

//                 if (!teamReply) {
//                     isMissed = true; // no reply at all
//                 } else {
//                     const diffSeconds =
//                         (new Date(teamReply.createdAt) - new Date(userMsg.createdAt)) / 1000;
//                     if (diffSeconds > MISSED_CHAT_THRESHOLD) {
//                         isMissed = true; // reply too late
//                     }
//                 }

//                 if (isMissed) {
//                     const week = getWeekNumber(userMsg.createdAt);
//                     if (!weeklyData[week]) weeklyData[week] = 0;
//                     weeklyData[week] += 1;
//                 }
//             }
//         }

//         const weeklyMissed = Object.entries(weeklyData).map(([week, count]) => ({
//             week: Number(week),
//             missedChats: count
//         }));

//         return res.json({ success: true, data: weeklyMissed });


//     } catch (error) {
//         console.error(err);
//         return res.status(500).json({ success: false, message: "Server error" });

//     }
// }


