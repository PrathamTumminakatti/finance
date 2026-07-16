import {

    getUserProfile,

    updateUserProfile

} from "../models/profileModel.js";

export const fetchProfile = async (userId) => {

    return await getUserProfile(userId);

};

export const saveProfile = async (profile) => {

    return await updateUserProfile(profile);

};