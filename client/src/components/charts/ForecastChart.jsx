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

function ForecastChart({ forecast }) {

    const historicalData =
        forecast?.forecast?.historical_data ?? [];

    const predictedExpense =
        forecast?.forecast?.predicted_expense ?? 0;

    if (historicalData.length === 0) {

        return (

            <div className="chart-card">

                <h2>Expense Forecast</h2>

                <p>
                    Not enough transaction history to generate
                    an expense forecast yet.
                </p>

            </div>

        );

    }

    const labels = historicalData.map((item) =>
        new Date(item.month).toLocaleString("default", {
            month: "short",
            year: "2-digit"
        })
    );

    const lastMonth = new Date(
        historicalData[historicalData.length - 1].month
    );

    const nextMonth = new Date(lastMonth);

    nextMonth.setMonth(
        nextMonth.getMonth() + 1
    );

    labels.push(
        nextMonth.toLocaleString("default", {
            month: "short",
            year: "2-digit"
        })
    );

    const data = historicalData.map(
        (item) => Number(item.total_expense)
    );

    data.push(predictedExpense);

    const chartData = {

        labels,

        datasets: [

            {
                label: "Expense Forecast",

                data,

                borderColor: "#7c3aed",

                backgroundColor: "#7c3aed",

                pointRadius: (context) => {

                    return context.dataIndex ===
                        data.length - 1
                        ? 8
                        : 4;

                },

                pointBackgroundColor: (context) => {

                    return context.dataIndex ===
                        data.length - 1
                        ? "#dc2626"
                        : "#7c3aed";

                },

                tension: 0.3
            }

        ]

    };

    return (

        <div className="chart-card">

            <h2>Expense Forecast</h2>

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

export default ForecastChart;