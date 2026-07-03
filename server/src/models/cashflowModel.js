import pool from '../config/db.js';

export const getUserIncome = async (userId) => {
  const result = await pool.query(
    `SELECT monthly_income
     FROM users
     WHERE id = $1`,
    [userId]
  );

  return result.rows[0];
};

export const getTotalExpenses = async (userId) => {
  const result = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) AS total_expenses
     FROM transactions
     WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
};

export const upsertCashflowSnapshot = async (
  userId,
  totalIncome,
  totalExpenses,
  disposableIncome
) => {
  const today = new Date().toISOString().split('T')[0];

  const existing = await pool.query(
    `SELECT id
     FROM cashflow_snapshots
     WHERE user_id = $1
     AND snapshot_date = $2`,
    [userId, today]
  );

  if (existing.rows.length > 0) {
    return pool.query(
      `UPDATE cashflow_snapshots
       SET total_income = $1,
           total_expenses = $2,
           disposable_income = $3
       WHERE user_id = $4
       AND snapshot_date = $5`,
      [
        totalIncome,
        totalExpenses,
        disposableIncome,
        userId,
        today
      ]
    );
  }

  return pool.query(
    `INSERT INTO cashflow_snapshots
     (
       user_id,
       snapshot_date,
       total_income,
       total_expenses,
       disposable_income
     )
     VALUES ($1,$2,$3,$4,$5)`,
    [
      userId,
      today,
      totalIncome,
      totalExpenses,
      disposableIncome
    ]
  );
};