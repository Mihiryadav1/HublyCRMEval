import Ticket from "../models/ticket.model.js";
import User from "../models/users.model.js";

export const createTicket = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        //Check if user already has a ticket
        // const existingTicket = await Ticket.findOne({ userId: req.user.userId });
        // if (existingTicket) {
        //     return res.status(200).json({
        //         message: "Ticket already exists for this user",
        //         ticket: existingTicket,
        //         alreadyExists: true
        //     });
        // }

        // Find admin
        const adminUser = await User.findOne({ role: "admin" });
        if (!adminUser)
            res.status(404).json({ message: "Admin user not found" });

        //Ticket ID generation
        const ticketId = `Ticket-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 6)}`;

        //Create Ticket 
        const newTicket = new Ticket({
            ticketId,
            name,
            email,
            phone,
            // userId: req.user.userId,
            assignedTo: adminUser._id
        });

        //Save Ticket to DB
        await newTicket.save();

        res.status(201).json({
            message: "Ticket Created Successfully",
            ticket: newTicket
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }
}

export const getAllTickets = async (req, res) => {
    try {


        //Query filters
        const { status, assignedTo, ticketId } = req.query;
        const filter = {};
        //only assigned tickets must be visible to users
        if (req.user.role !== "admin") {
            filter.assignedTo = req.user.userId;
        }

        if (status) filter.status = status;
        if (assignedTo) filter.assignedTo = assignedTo;
        if (ticketId) filter.ticketId = ticketId;

        //Fetch tickets from DB as per filters and populate assignedTo field
        const tickets = await Ticket.find(filter)
            .populate("assignedTo", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Tickets fetched successfully",
            tickets
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching tickets",
            error: error.message
        });
    }
}

//Get Ticket by ID
export const getTicketById = async (req, res) => {
    try {
        const id = req.params.ticketId;
        const ticket = await Ticket.findOne({ _id: id })
            .populate("assignedTo", "name email role")
            .sort({ createdAt: -1 });

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json({
            message: "Tickets fetched successfully",
            ticket
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching tickets",
            error: error.message
        });
    }
}

//Update Ticket Status
export const updateTicketStatus = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { status } = req.body;

        //Find Ticket
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        //Update Status
        ticket.status = status;
        await ticket.save();
        res.status(200).json({
            message: "Ticket status updated successfully",
            ticket
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating ticket status",
            error: error.message
        });
    }
}

// Assign ticket to a user
export const assignTicket = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        const { ticketId } = req.params;
        const { assignedTo } = req.body;

        //Check if user exists
        const user = await User.findById(assignedTo)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //Find Ticket
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        ticket.assignedTo = assignedTo;
        await ticket.save();
        console.log("Ticket Assigned")
        res.status(200).json({
            message: "Ticket assigned successfully",
            ticket,
            assignedTo: user
        });

    } catch (error) {
        res.status(500).json({
            message: "Error assigning ticket",
            error: error.message
        });
    }
}