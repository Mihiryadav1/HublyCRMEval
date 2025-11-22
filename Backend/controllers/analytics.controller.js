import Ticket from "../../Frontend/src/Components/Ticket/Ticket"

export const getAvgResplyTime = async (req, res) => {
    try {
        const tickets = await Ticket.find()
    } catch (error) {
        console.log(err)
    }
}