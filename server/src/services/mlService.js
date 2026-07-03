import axios from 'axios';

const getBaseURL = () => {
    const baseURL = process.env.ML_SERVICE_URL;

    if (!baseURL) {
        throw new Error("ML_SERVICE_URL is not defined in environment");
    }

    return baseURL.replace(/\/$/, "");
};

export const analyzeTransaction = async (data) => {
    try {

        const res = await axios.post(
            `${getBaseURL()}/analyze`,
            data
        );

        return res.data;

    } catch (error) {

        console.error("ML Analyze Error:", error.message);

        throw new Error("Failed to analyze transaction");
    }
};

export const forecastExpenses = async (userId) => {
    try {

        const res = await axios.post(
            `${getBaseURL()}/forecast`,
            {
                user_id: userId
            }
        );

        return res.data;

    } catch (error) {

        console.error("ML Forecast Error:", error.message);

        throw new Error("Failed to generate forecast");
    }
};