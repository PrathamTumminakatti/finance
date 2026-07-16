import { formatCurrency } from "../../utils/formatCurrency";

function AnalyticsSummary({ summary }) {

    return (

        <div className="summary-grid">

            <div className="summary-card">

                <h3>Highest Spending Category</h3>

                <h2>

                    {summary.highestCategory}

                </h2>

                <p>

                    {formatCurrency(
                        summary.highestCategoryAmount
                    )}

                </p>

            </div>

            <div className="summary-card">

                <h3>Average Monthly Spending</h3>

                <h2>

                    {formatCurrency(
                        summary.averageMonthlyExpense
                    )}

                </h2>

            </div>

            <div className="summary-card">

                <h3>Total Transactions</h3>

                <h2>

                    {summary.totalTransactions}

                </h2>

            </div>

            <div className="summary-card">

                <h3>Average Transaction</h3>

                <h2>

                    {formatCurrency(
                        summary.averageTransaction
                    )}

                </h2>

            </div>

        </div>

    );

}

export default AnalyticsSummary;