import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

import "./styles/Charts.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function ExpenseTrendChart({ monthlyTrend }) {
    const chartData = {
        labels: monthlyTrend.map((item) =>
            new Date(item.month).toLocaleString("default", {
                month: "short",
                year: "2-digit"
            })
        ),

        datasets: [
            {
                label: "Monthly Expenses",

                data: (monthlyTrend ?? []).map((item) =>
                    Number(item.total_expense)
                ),

                borderColor: "#2563eb",

                backgroundColor: "#2563eb",

                tension: 0.3
            }
        ]
    };

    return (
        <div className="chart-card">
            <h2>Expense Trend</h2>

            <Line
    data={chartData}
    options={{
        responsive: true,
        maintainAspectRatio: false
    }}
/>
        </div>
    );
}

export default ExpenseTrendChart;