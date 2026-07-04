import pool from '../config/db.js';

export const getFinancialSummary = async (userId) => {

    const result = await pool.query(
        `
        SELECT
            u.monthly_income,

            COALESCE(cs.total_income, 0) AS total_income,
            COALESCE(cs.total_expenses, 0) AS total_expenses,
            COALESCE(cs.disposable_income, 0) AS disposable_income

        FROM users u

        LEFT JOIN cashflow_snapshots cs
            ON u.id = cs.user_id

        WHERE u.id = $1

        ORDER BY cs.snapshot_date DESC

        LIMIT 1
        `,
        [userId]
    );

    return result.rows[0];

};
export const getCategorySpending = async (userId) => {

    const result = await pool.query(
        `
        SELECT
            category,
            SUM(amount) AS total_spent,
            COUNT(*) AS transaction_count,
            AVG(amount) AS average_transaction

        FROM transactions

        WHERE user_id = $1

        GROUP BY category

        ORDER BY total_spent DESC
        `,
        [userId]
    );

    return result.rows;

};
export const getMonthlySpendingTrend = async (userId) => {

    const result = await pool.query(
        `
        SELECT
            DATE_TRUNC('month', transaction_date) AS month,
            SUM(amount) AS total_expense

        FROM transactions

        WHERE user_id = $1

        GROUP BY month

        ORDER BY month
        `,
        [userId]
    );

    return result.rows;

};