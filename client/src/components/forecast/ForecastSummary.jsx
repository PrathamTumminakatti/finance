import { formatCurrency } from "../../utils/formatCurrency";

function ForecastSummary({ forecast }) {

    const predictedExpense = forecast?.predicted_expense ?? 0;

    const status =

        predictedExpense > 50000

            ? "High"

            : predictedExpense > 30000

                ? "Moderate"

                : "Low";

    return (

        <div className="summary-card">

            <h2>Forecast Summary</h2>

            <div className="forecast-summary">

                <div>

                    <h3>Predicted Next Month Expense</h3>

                    <h1>

                        {formatCurrency(predictedExpense)}

                    </h1>

                </div>

                <div>

                    <h3>Forecast Status</h3>

                    <h2>{status}</h2>

                </div>

            </div>

        </div>

    );

}

export default ForecastSummary;