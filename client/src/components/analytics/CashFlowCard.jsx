import { formatCurrency } from "../../utils/formatCurrency";

function CashFlowCard({ cashFlow }) {

    return (

        <div className="summary-card">

            <h2>Cash Flow Analysis</h2>

            <div className="cashflow-item">

                <span>Income</span>

                <strong>

                    {formatCurrency(cashFlow.income)}

                </strong>

            </div>

            <div className="cashflow-item">

                <span>Expenses</span>

                <strong>

                    {formatCurrency(cashFlow.expenses)}

                </strong>

            </div>

            <div className="cashflow-item">

                <span>Disposable Income</span>

                <strong

                    className={

                        cashFlow.disposableIncome >= 0

                            ? "positive"

                            : "negative"

                    }

                >

                    {formatCurrency(

                        cashFlow.disposableIncome

                    )}

                </strong>

            </div>

        </div>

    );

}

export default CashFlowCard;