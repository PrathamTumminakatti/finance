import {
    getFinancialSummary,
    getCategorySpending,
    getMonthlySpendingTrend
} from '../models/recommendationModel.js';

import { forecastExpenses } from './mlService.js';

/*
|--------------------------------------------------------------------------
| Financial Thresholds
|--------------------------------------------------------------------------
*/

const FORECAST_THRESHOLDS = {

    HEALTHY: 70,

    MODERATE: 90

};

const CATEGORY_LIMITS = {

    Food: 30,

    "Bills & Utilities": 25,

    Shopping: 10,

    Travel: 10,

    Entertainment: 5,

    Healthcare: 10,

    Education: 10

};

/*
    Analyze forecast data.
*/
const analyzeForecast = (
    financialSummary,
    forecast
) => {

    const recommendations = [];

    const monthlyIncome = Number(financialSummary.monthly_income);

    const predictedExpense = Number(
        forecast.forecast.predicted_expense
    );

    const expenseRatio =
        (predictedExpense / monthlyIncome) * 100;

    let forecastStatus = "healthy";

    if (expenseRatio > FORECAST_THRESHOLDS.MODERATE) {

        forecastStatus = "high";

        recommendations.push({

            type: "warning",

            priority: "high",

            category: "Forecast",

            title: "Forecasted expenses are very high",

            description:
                `Your forecasted expenses are expected to consume ${expenseRatio.toFixed(1)}% of your monthly income.`,

            recommendation:
                "Reduce discretionary spending before next month begins.",

            impact:
                "Lower expenses will increase your projected disposable income."

        });

    }

    else if (expenseRatio > FORECAST_THRESHOLDS.HEALTHY) {

        forecastStatus = "moderate";

        recommendations.push({

            type: "info",

            priority: "medium",

            category: "Forecast",

            title: "Forecasted expenses are increasing",

            description:
                `Your forecasted expenses are expected to consume ${expenseRatio.toFixed(1)}% of your monthly income.`,

            recommendation:
                "Monitor your spending and avoid unnecessary purchases.",

            impact:
                "Maintaining controlled spending will improve future savings."

        });

    }

    else {

        recommendations.push({

            type: "success",

            priority: "low",

            category: "Forecast",

            title: "Healthy expense forecast",

            description:
                `Your forecasted expenses are expected to consume only ${expenseRatio.toFixed(1)}% of your monthly income.`,

            recommendation:
                "Continue maintaining your current spending habits.",

            impact:
                "You are likely to maintain a healthy disposable income."

        });

    }

    return {

        recommendations,

        metrics: {

            expenseRatio,

            forecastStatus

        }

    };

};

/*
    Analyze disposable income.
*/
const analyzeDisposableIncome = (
    financialSummary
) => {

    const recommendations = [];

    const disposableIncome = Number(
        financialSummary.disposable_income
    );

    const monthlyIncome = Number(
        financialSummary.monthly_income
    );

    const savingsRatio =
        (disposableIncome / monthlyIncome) * 100;

    let savingsStatus = "healthy";

    if (savingsRatio < 10) {

        savingsStatus = "critical";

        recommendations.push({

            type: "warning",

            priority: "high",

            category: "Savings",

            title: "Very Low Disposable Income",

            description:
                `Only ${savingsRatio.toFixed(1)}% of your income remains after expenses.`,

            recommendation:
                "Reduce discretionary spending and review recurring expenses.",

            impact:
                "Increasing disposable income improves financial stability."

        });

    }

    else if (savingsRatio < 20) {

        savingsStatus = "moderate";

        recommendations.push({

            type: "info",

            priority: "medium",

            category: "Savings",

            title: "Disposable Income Can Be Improved",

            description:
                `Your disposable income is ${savingsRatio.toFixed(1)}% of your monthly income.`,

            recommendation:
                "Aim to increase monthly savings where possible.",

            impact:
                "Higher savings improve your financial resilience."

        });

    }

    else {

        recommendations.push({

            type: "success",

            priority: "low",

            category: "Savings",

            title: "Healthy Disposable Income",

            description:
                `Your disposable income is ${savingsRatio.toFixed(1)}% of your monthly income.`,

            recommendation:
                "Continue maintaining your current savings habit.",

            impact:
                "Healthy savings improve long-term financial security."

        });

    }

    return {

        recommendations,

        metrics: {

            savingsRatio,

            savingsStatus

        }

    };

};

/*
    Analyze category-wise budgets.
*/
const analyzeCategoryBudgets = (
    categorySpending,
    financialSummary
) => {

    const recommendations = [];

    const totalExpenses =
        Number(financialSummary.total_expenses);

    for (const category of categorySpending) {

        const spent =
            Number(category.total_spent);

        const percentage =
            (spent / totalExpenses) * 100;

        const limit =
            CATEGORY_LIMITS[category.category];

        if (!limit)
            continue;

        if (percentage > limit) {

            recommendations.push({

                type: "warning",

                priority: "medium",

                category: category.category,

                title:
                    `${category.category} spending exceeds the recommended limit`,

                description:
                    `${percentage.toFixed(1)}% of your expenses are allocated to ${category.category}.`,

                recommendation:
                    `Try reducing ${category.category} spending.`,

                impact:
                    "Better category balance improves your monthly savings."

            });

        }

    }

    return {

        recommendations,

        metrics: {}

    };

};

/*
    Analyze monthly spending trends.
*/
const analyzeMonthlyTrend = (
    monthlyTrend
) => {

    const recommendations = [];

    if (monthlyTrend.length < 2) {

        return {
            recommendations,
            metrics: {
                trend: "insufficient_data"
            }
        };

    }

    const currentMonth =
        Number(monthlyTrend[monthlyTrend.length - 1].total_expense);

    const previousMonth =
        Number(monthlyTrend[monthlyTrend.length - 2].total_expense);

    const difference = currentMonth - previousMonth;

    const percentageChange =
        (difference / previousMonth) * 100;

    let trend = "stable";

    if (percentageChange > 10) {

        trend = "increasing";

        recommendations.push({

            type: "warning",

            priority: "medium",

            category: "Trend",

            title: "Monthly spending is increasing",

            description:
                `Your spending increased by ${percentageChange.toFixed(1)}% compared to last month.`,

            recommendation:
                "Review recent expenses and reduce unnecessary purchases.",

            impact:
                "Controlling spending growth will improve future savings."

        });

    }
    else if (percentageChange < -10) {

        trend = "decreasing";

        recommendations.push({

            type: "success",

            priority: "low",

            category: "Trend",

            title: "Monthly spending is decreasing",

            description:
                `Your spending decreased by ${Math.abs(percentageChange).toFixed(1)}% compared to last month.`,

            recommendation:
                "Continue maintaining disciplined spending habits.",

            impact:
                "Lower spending supports long-term financial stability."

        });

    }

    return {

        recommendations,

        metrics: {

            trend,

            percentageChange

        }

    };

};

/*
    Calculate overall financial health score.
*/
const calculateFinancialHealthScore = (
    metrics
) => {

    let score = 100;

    if (
        metrics.forecast.forecastStatus === "high"
    ) {
        score -= 30;
    }
    else if (
        metrics.forecast.forecastStatus === "moderate"
    ) {
        score -= 15;
    }

    if (
        metrics.disposableIncome.savingsStatus === "critical"
    ) {
        score -= 30;
    }
    else if (
        metrics.disposableIncome.savingsStatus === "moderate"
    ) {
        score -= 15;
    }

    if (
        metrics.monthlyTrend.trend === "increasing"
    ) {
        score -= 10;
    }

    score = Math.max(0, score);

    let status = "Excellent";

    if (score < 40)
        status = "Poor";
    else if (score < 60)
        status = "Average";
    else if (score < 80)
        status = "Good";

    return {

        score,

        status

    };

};
const collectFinancialData = async (userId) => {

    const financialSummary =
        await getFinancialSummary(userId);

    const categorySpending =
        await getCategorySpending(userId);

    const monthlyTrend =
        await getMonthlySpendingTrend(userId);

    const forecast =
        await forecastExpenses(userId);

    return {
        financialSummary,
        categorySpending,
        monthlyTrend,
        forecast
    };

};
const runAnalyzers = (data) => {

    const forecastAnalysis =
        analyzeForecast(
            data.financialSummary,
            data.forecast
        );

    const disposableIncomeAnalysis =
        analyzeDisposableIncome(
            data.financialSummary
        );

    const categoryBudgetAnalysis =
        analyzeCategoryBudgets(
            data.categorySpending,
            data.financialSummary
        );

    const monthlyTrendAnalysis =
        analyzeMonthlyTrend(
            data.monthlyTrend
        );

    return {

        recommendations: [

            ...forecastAnalysis.recommendations,

            ...disposableIncomeAnalysis.recommendations,

            ...categoryBudgetAnalysis.recommendations,

            ...monthlyTrendAnalysis.recommendations

        ],

        metrics: {

            forecast:
                forecastAnalysis.metrics,

            disposableIncome:
                disposableIncomeAnalysis.metrics,

            categoryBudgets:
                categoryBudgetAnalysis.metrics,

            monthlyTrend:
                monthlyTrendAnalysis.metrics

        }

    };

};

export const generateRecommendations = async (userId) => {

    const data =
        await collectFinancialData(userId);

    const analysis =
        runAnalyzers(data);

    const financialHealth =
        calculateFinancialHealthScore(
            analysis.metrics
        );

    return {

        ...data,

        recommendations:
            analysis.recommendations,

        metrics:
            analysis.metrics,

        financialHealth

    };

};