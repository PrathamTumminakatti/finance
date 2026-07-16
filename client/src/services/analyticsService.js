import api from "./api";

export const getAnalytics = async (userId) => {

    const response = await api.post(

        "/analytics",

        {

            user_id: userId

        }

    );

    return response.data;

};