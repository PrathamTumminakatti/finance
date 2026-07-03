import express from 'express';
import { addTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/add', addTransaction);

export default router;