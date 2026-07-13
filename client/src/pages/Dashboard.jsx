import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import { getRecommendations } from "../services/recommendationService";

import SummarySection from "../components/dashboard/SummarySection";
import RecommendationSection from "../components/dashboard/RecommendationSection";
import TopCategoriesSection from "../components/dashboard/TopCategoriesSection";
import SavingsSection from "../components/dashboard/SavingsSection";

import ExpenseTrendChart from "../components/charts/ExpenseTrendChart";
import ForecastChart from "../components/charts/ForecastChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";

import "../components/dashboard/styles/Dashboard.css";

function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getRecommendations(
                    "11111111-1111-1111-1111-111111111111"
                );

                console.log("Dashboard Data:", data);

                setDashboardData(data);

            } catch (err) {

                console.error(err);

                setError("Failed to load dashboard.");

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    return (

        <MainLayout>

            <div className="dashboard-container">

                <div className="dashboard-header">

    <h1>Financial Dashboard</h1>

    <p>

        Track your expenses, forecasts and AI insights
        in one place.

    </p>

</div>

                {loading && <p>Loading...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && (

                    <>

                        {/* Summary Cards */}

                        <SummarySection
                            summary={dashboardData.dashboardSummary}
                        />

                        {/* Charts */}

                        <div className="dashboard-row">

                            <ExpenseTrendChart
                                monthlyTrend={dashboardData.monthlyTrend}
                            />

                            <ForecastChart
                                forecast={dashboardData.forecast}
                            />

                        </div>

                        {/* AI Recommendation + Pie Chart */}

                        <div className="dashboard-row">

                            <RecommendationSection
                                recommendations={dashboardData.recommendations}
                            />

                            <CategoryPieChart
                                categories={dashboardData.topCategories}
                            />

                        </div>

                        {/* Detailed Category Table */}

                        <div className="dashboard-full">

                            <TopCategoriesSection
                                categories={dashboardData.topCategories}
                            />

                        </div>

                        {/* Savings Opportunities */}

                        <div className="dashboard-full">

                            <SavingsSection
                                opportunities={dashboardData.savingsOpportunities}
                            />

                        </div>

                    </>

                )}

            </div>

        </MainLayout>

    );

}

export default Dashboard;