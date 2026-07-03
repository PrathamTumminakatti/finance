import pool from '../config/db.js';

export const insertTransaction = async (transaction) => {
  const query = `
    INSERT INTO transactions (
      user_id,
      amount,
      transaction_date,
      description,
      category,
      subcategory,
      entities,
      is_anomalous,
      anomaly_type,
      is_recurring
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `;

  const values = [
    transaction.user_id,
    transaction.amount,
    transaction.transaction_date,
    transaction.description,
    transaction.category,
    transaction.subcategory,
    JSON.stringify(transaction.entities),
    transaction.is_anomalous,
    transaction.anomaly_type,
    transaction.is_recurring
  ];

  // ===== DEBUG START =====
  console.log("===== ENTITIES DEBUG =====");
  console.log("Type:", typeof transaction.entities);
  console.log("Is Array:", Array.isArray(transaction.entities));
  console.dir(transaction.entities, { depth: null });
  console.log("JSON:", JSON.stringify(transaction.entities));
  console.log("==========================");
  // ===== DEBUG END =====

  const result = await pool.query(query, values);
  return result.rows[0];
};