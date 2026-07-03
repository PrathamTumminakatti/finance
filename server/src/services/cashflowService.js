import {
  getUserIncome,
  getTotalExpenses,
  upsertCashflowSnapshot
} from '../models/cashflowModel.js';

export const updateCashflowSnapshot = async (userId) => {
    console.log("Updating snapshot for user:", userId);

  const incomeData = await getUserIncome(userId);

  const expenseData = await getTotalExpenses(userId);

  const totalIncome =
    Number(incomeData.monthly_income);

  const totalExpenses =
    Number(expenseData.total_expenses);

  const disposableIncome =
    totalIncome - totalExpenses;

  await upsertCashflowSnapshot(
    userId,
    totalIncome,
    totalExpenses,
    disposableIncome
  );
};