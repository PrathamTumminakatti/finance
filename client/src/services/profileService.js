import api from "./api";

export const getProfile = async (userId) => {

    const response = await api.get(

        `/profile/${userId}`

    );

    return response.data;

};

export const updateProfile = async (profile) => {

    const response = await api.put(

        "/profile",

        profile

    );

    return response.data;

};