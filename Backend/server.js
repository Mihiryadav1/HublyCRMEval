import express from 'express'
import path from "path";
import cors from 'cors'
import { fileURLToPath } from "url";
import { configDotenv } from 'dotenv'
import { connectToMongoDB } from './config/db.js'
import session from 'express-session'
import authRoutes from './routes/auth.routes.js'
import teamRoutes from './routes/team.routes.js'
import ticketRoutes from './routes/ticket.route.js'
import messageRoutes from './routes/message.routes.js'
import chatbotRoutes from './routes/chatbot.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'

configDotenv()
connectToMongoDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//middlewares
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "https://hubly-crm-eval.onrender.com",
    "https://hublycrm-frontend.vercel.app//"
];

/* ----------------------------- FIXED CORS ----------------------------- */

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

// IMPORTANT: allow preflight before any route
app.options(/.*/, cors());

// app.use
app.use(
    session({
        secret: `${process.env.SESSION_SECRET}`,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
    })
);
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes)
app.use("/api/team", teamRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/message", messageRoutes)
app.use("/api/chatbot", chatbotRoutes)
app.use("/api/analytics", analyticsRoutes)

app.use(express.static(path.join(__dirname, "build")));
// ⬇ REACT FALLBACK (Express 5 safe)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});
// // Server Test Route
// app.get("/", (req, res) => {
//     res.send("<h1>Server Up</h1>");
// });

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening at  http://localhost:${process.env.PORT}`);
});
