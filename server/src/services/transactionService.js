import { analyzeTransaction } from "./mlService.js";
import { updateCashflowSnapshot } from "./cashflowService.js";
import { updateCategoryBaseline } from "./baselineService.js";

import {
    insertTransaction,
    getTransactionsByUser
} from "../models/transactionModel.js";

export const processTransaction = async (input) => {

    // Step 1: Send to ML service

    const mlResult = await analyzeTransaction({
        description: input.description,
        amount: input.amount
    });

    console.log("========== ML RESULT ==========");
    console.dir(mlResult, { depth: null });

    // Step 2: Merge ML output with user input

    const enrichedTransaction = {

        user_id: input.user_id,

        amount: input.amount,

        transaction_date: input.transaction_date,

        description: input.description,

        category: mlResult.category,

        subcategory: mlResult.subcategory,

        entities: mlResult.entities,

        is_anomalous: mlResult.is_anomalous,

        anomaly_type: mlResult.anomaly_type,

        is_recurring: mlResult.is_recurring

    };

    // Step 3: Store in DB

    const savedTransaction = await insertTransaction(
        enrichedTransaction
    );

    // Step 4: Update Financial Snapshot

    await updateCashflowSnapshot(
        input.user_id
    );

    // Step 5: Update Category Baseline

    await updateCategoryBaseline(
        input.user_id,
        enrichedTransaction.category,
        enrichedTransaction.amount
    );

    return savedTransaction;

};

export const fetchTransactions = async (userId) => {

    return await getTransactionsByUser(userId);

};