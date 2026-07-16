import { formatCurrency } from "../../utils/formatCurrency";

function ForecastInterpretation({ forecast }) {

    const amount = forecast.predicted_expense;

    let message = "";

    if (amount >= 50000) {

        message =
            "Your forecast indicates very high spending next month. Consider reviewing discretionary expenses and recurring payments.";

    }

    else if (amount >= 30000) {

        message =
            "Your spending is expected to remain moderate. Continue monitoring expenses to avoid unnecessary increases.";

    }

    else {

        message =
            "Your forecast indicates relatively controlled spending next month. Maintain your current financial habits.";

    }

    return (

        <div className="summary-card">

            <h2>Forecast Interpretation</h2>

            <p>

                Based on historical spending patterns, your expected expenditure next month is

                <strong>

                    {" "}

                    {formatCurrency(amount)}

                </strong>.

            </p>

            <br />

            <p>{message}</p>

        </div>

    );

}

export default ForecastInterpretation;