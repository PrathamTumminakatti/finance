import express from 'express';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes.js';
import dotenv from 'dotenv';
import forecastRoutes from './routes/forecastRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import analyticsRoutes from "./routes/analyticsRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);
app.use('/api/forecast', forecastRoutes);
app.use(
    '/api/recommendations',
    recommendationRoutes
);
app.use(
    "/api/analytics",
    analyticsRoutes
);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", (req, res, next) => {
    console.log("AUTH ROUTE HIT:", req.method, req.url);
    next();
});

app.use("/api/auth", authRoutes);
export default app;