import express from 'express';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes.js';
import dotenv from 'dotenv';
import forecastRoutes from './routes/forecastRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';

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
export default app;