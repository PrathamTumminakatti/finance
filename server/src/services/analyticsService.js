import pool from "../config/db.js";

export const generateAnalytics = async (userId) => {

    // Financial Summary
    const financialSummaryQuery = `
        SELECT
            monthly_income,
            (
                SELECT COALESCE(SUM(amount), 0)
                FROM transactions
                WHERE user_id = users.id
            ) AS total_expenses
        FROM users
        WHERE id = $1;
    `;

    // Category Spending
    const categorySpendingQuery = `
        SELECT
            category,
            SUM(amount) AS total_spent,
            COUNT(*) AS transaction_count
        FROM transactions
        WHERE user_id = $1
        GROUP BY category
        ORDER BY total_spent DESC;
    `;

    // Monthly Trend
    const monthlyTrendQuery = `
        SELECT
            DATE_TRUNC('month', transaction_date) AS month,
            SUM(amount) AS total_expense
        FROM transactions
        WHERE user_id = $1
        GROUP BY DATE_TRUNC('month', transaction_date)
        ORDER BY month;
    `;

    const [

        financialSummary,

        categorySpending,

        monthlyTrend

    ] = await Promise.all([

        pool.query(financialSummaryQuery, [userId]),

        pool.query(categorySpendingQuery, [userId]),

        pool.query(monthlyTrendQuery, [userId])

    ]);

    const summary = financialSummary.rows[0];

    const monthlyIncome = Number(summary.monthly_income);

    const totalExpenses = Number(summary.total_expenses);

    const disposableIncome =
        monthlyIncome - totalExpenses;

    const cashFlow = {

        income: monthlyIncome,

        expenses: totalExpenses,

        disposableIncome

    };

    const spendingInsights = [];

    if (totalExpenses > monthlyIncome) {

        spendingInsights.push({

            type: "warning",

            message:
                "Your expenses are higher than your monthly income."

        });

    }

    if (categorySpending.rows.length > 0) {

        spendingInsights.push({

            type: "info",

            message: `Your highest spending category is ${categorySpending.rows[0].category}.`

        });

    }

    const transactionStatsQuery = `
    SELECT
        COUNT(*) AS total_transactions,
        AVG(amount) AS average_transaction
    FROM transactions
    WHERE user_id = $1;
`;

const transactionStats = await pool.query(
    transactionStatsQuery,
    [userId]
);

const stats = transactionStats.rows[0];

const highestCategory =
    categorySpending.rows.length > 0
        ? categorySpending.rows[0]
        : null;

const averageMonthlyExpense =

    monthlyTrend.rows.length > 0

        ?

        monthlyTrend.rows.reduce(

            (sum, month) =>

                sum + Number(month.total_expense),

            0

        ) / monthlyTrend.rows.length

        :

        0;

return {

    financialSummary: {

        monthlyIncome,

        totalExpenses,

        disposableIncome

    },

    categorySpending:
        categorySpending.rows,

    monthlyTrend:
        monthlyTrend.rows,

    cashFlow,

    spendingInsights,

    analyticsSummary: {

        highestCategory:

            highestCategory

                ? highestCategory.category

                : "N/A",

        highestCategoryAmount:

            highestCategory

                ? Number(
                    highestCategory.total_spent
                )

                : 0,

        totalTransactions:

            Number(
                stats.total_transactions
            ),

        averageTransaction:

            Number(
                stats.average_transaction
            ),

        averageMonthlyExpense 

    }
}

};