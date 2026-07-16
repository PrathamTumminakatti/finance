import { generateAnalytics } from "../services/analyticsService.js";

export const getAnalytics = async (req, res) => {

    try {

        const { user_id } = req.body;

        if (!user_id) {

            return res.status(400).json({

                error: "User ID is required."

            });

        }

        const analytics = await generateAnalytics(user_id);

        return res.status(200).json(analytics);

    }

    catch (error) {

        console.error("Analytics Error:", error);

        return res.status(500).json({

            error: "Failed to generate analytics."

        });

    }

};