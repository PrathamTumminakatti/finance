import {
    getBaseline,
    createBaseline,
    updateBaseline
} from '../models/baselineModel.js';

export const updateCategoryBaseline = async (
    userId,
    category,
    amount
) => {

    // Check if baseline already exists
    const baseline = await getBaseline(userId, category);

    if (!baseline) {

        // First transaction for this category
        await createBaseline(
            userId,
            category,
            amount,
            1,
            amount
        );

        return;
    }

    // Calculate updated totals
    const totalSpent =
        Number(baseline.total_spent) + Number(amount);

    const transactionCount =
        baseline.transaction_count + 1;

    const averageSpend =
        totalSpent / transactionCount;

    // Save updated baseline
    await updateBaseline(
        baseline.id,
        totalSpent,
        transactionCount,
        averageSpend
    );

};