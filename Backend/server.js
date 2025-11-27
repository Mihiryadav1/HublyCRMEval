import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { connectToMongoDB } from './config/db.js'
import session from 'express-session'
import authRoutes from './routes/auth.routes.js'
import teamRoutes from './routes/team.routes.js'
import ticketRoutes from './routes/ticket.route.js'
import messageRoutes from './routes/message.routes.js'
import chatbotRoutes from './routes/chatbot.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'

const app = express();
//CORS
const allowedOrigins = [
    "http://localhost:5173",
    "https://hubly-crm-eval.onrender.com",
    "https://hublycrm-frontend.vercel.app/"
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },

    credentials: true,
}));
app.options(/.*/, cors());

//DotENV
configDotenv()
//DB connection
connectToMongoDB();


//middlewares
app.use(express.json());
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


// Server Test Route
app.get("/", (req, res) => {
    res.send("Server is up and running");
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening at  http://localhost:${process.env.PORT}`);
});
