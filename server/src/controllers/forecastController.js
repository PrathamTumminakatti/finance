import { forecastExpenses } from '../services/mlService.js';

export const getForecast = async (req, res) => {
    try {

        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                error: "user_id is required"
            });
        }

        const forecast = await forecastExpenses(user_id);

        return res.status(200).json({
            message: "Forecast generated successfully",
            data: forecast
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });

    }
};