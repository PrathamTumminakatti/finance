import { generateRecommendations } from '../services/recommendationService.js';

export const getRecommendations = async (req, res) => {

    try {

        const { user_id } = req.body;

        if (!user_id) {

            return res.status(400).json({

                error: "user_id is required"

            });

        }

        const recommendations =
            await generateRecommendations(user_id);

        res.status(200).json(recommendations);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: error.message

        });

    }

};