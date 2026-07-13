import DashboardCard from "./DashboardCard";

import "./styles/SummarySection.css";

function SummarySection({ summary }) {

    return (

        <div className="summary-grid">

            <DashboardCard
    title="Health Score"
    value={`${summary.financialHealth.score} / 100`}
    subtitle={summary.financialHealth.status}
    color="#f59e0b"
/>

            <DashboardCard
                title="Total Expenses"
                value={`₹${summary.totalExpenses}`}
                subtitle={`Budget: ₹${summary.budget}`}

                color="#dc2626"
            />

            <DashboardCard
                title="Disposable Income"
                value={`₹${summary.disposableIncome}`}
                color="#16a34a"
            />

            <DashboardCard
                title="Forecast"
                value={`₹${summary.forecastExpense}`}
                color="#7c3aed"
            />

            <DashboardCard
                title="Health Score"
                value={`${summary.financialHealth.score}`}
                color="#f59e0b"
            />

        </div>

    );

}

export default SummarySection;