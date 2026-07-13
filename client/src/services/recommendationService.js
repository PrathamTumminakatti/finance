import api from "./api";

export const getRecommendations = async (userId) => {

    const response = await api.post(

        "/recommendations",

        {

            user_id: userId

        }

    );

    return response.data;

};