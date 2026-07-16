import {

    Chart as ChartJS,

    ArcElement,

    Tooltip,

    Legend

} from "chart.js";

import { Pie } from "react-chartjs-2";

import "./styles/Charts.css";

ChartJS.register(

    ArcElement,

    Tooltip,

    Legend

);

function CategoryPieChart({ categories }) {

    const chartData = {

        labels: (categories ?? []).map(

            item => item.category

        ),

        datasets: [

            {

                data: (categories ?? []).map(

                    item => Number(

                        item.amount ??

                        item.total_spent ??

                        0

                    )

                ),

                backgroundColor: [

                    "#2563eb",

                    "#16a34a",

                    "#f59e0b",

                    "#dc2626",

                    "#7c3aed",

                    "#0ea5e9",

                    "#84cc16"

                ],

                borderWidth: 1

            }

        ]

    };

    return (

        <div className="chart-card">

            <h2>Expense Distribution</h2>

            <Pie data={chartData} />

        </div>

    );

}

export default CategoryPieChart;