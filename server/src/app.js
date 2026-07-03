import express from 'express';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes.js';
import dotenv from 'dotenv';
import forecastRoutes from './routes/forecastRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);
app.use('/api/forecast', forecastRoutes);

export default app;