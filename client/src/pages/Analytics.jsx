import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import CashFlowCard from "../components/analytics/CashFlowCard";
import SpendingInsights from "../components/analytics/SpendingInsights";

import ExpenseTrendChart from "../components/charts/ExpenseTrendChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import AnalyticsSummary from "../components/analytics/AnalyticsSummary";
import { getAnalytics } from "../services/analyticsService";

import "../components/analytics/styles/Analytics.css";

function Analytics() {

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const data = await getAnalytics(
                    "11111111-1111-1111-1111-111111111111"
                );

                console.log(data);

                setAnalytics(data);

            }

            catch (err) {

                console.error(err);

                setError("Failed to load analytics.");

            }

            finally {

                setLoading(false);

            }

        };

        fetchAnalytics();

    }, []);

    return (

        <MainLayout>

            <div className="analytics-container">

                <h1>Analytics</h1>

                {

                    loading

                        ? <p>Loading...</p>

                        : error

                            ? <p>{error}</p>

                            :

                            <>
                            <AnalyticsSummary

    summary={analytics.analyticsSummary}

/>

                                <div className="analytics-row">

                                    <ExpenseTrendChart
                                        monthlyTrend={analytics.monthlyTrend}
                                    />

                                    <CategoryPieChart
                                        categories={analytics.categorySpending}
                                    />

                                </div>

                                <div className="analytics-row">

                                    <CashFlowCard
                                        cashFlow={analytics.cashFlow}
                                    />

                                    <SpendingInsights
                                        insights={analytics.spendingInsights}
                                    />

                                </div>

                            </>

                }

            </div>

        </MainLayout>

    );

}

export default Analytics;