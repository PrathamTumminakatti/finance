import api from "./api";

export const getForecast = async (userId) => {

    const response = await api.post(

        "/forecast",

        {

            user_id: userId

        }

    );

    return response.data.data;

};