import {
    processTransaction,
    fetchTransactions
} from '../services/transactionService.js';

export const addTransaction = async (req, res) => {
  try {
    const data = req.body;

    // Basic validation (expand later)
    if (!data.user_id || !data.amount || !data.transaction_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await processTransaction(data);

    res.status(201).json({
      message: "Transaction processed successfully",
      data: result
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getTransactions = async (req, res) => {

    try {

        const { userId } = req.params;

        const transactions =
            await fetchTransactions(userId);

        res.status(200).json(transactions);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Internal server error"
        });

    }

};