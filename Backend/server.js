import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { connectToMongoDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import teamRoutes from './routes/team.routes.js'
import ticketRoutes from './routes/ticket.route.js'
import messageRoutes from './routes/message.routes.js'
import chatbotRoutes from './routes/chatbot.routes.js'

configDotenv()
connectToMongoDB();

const app = express();

//middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes)
app.use("/api/team", teamRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/message", messageRoutes)
app.use("/api/chatbot", chatbotRoutes)

// Server Test Route
app.get("/", (req, res) => {
    res.send("<h1>Server Up</h1>");
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening at  http://localhost:${process.env.PORT}`);
});
