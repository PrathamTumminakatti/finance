import {

    fetchProfile,

    saveProfile

} from "../services/profileService.js";

export const getProfile = async (req, res) => {

    try {

        const { userId } = req.params;

        const profile = await fetchProfile(userId);

        if (!profile) {

            return res.status(404).json({

                error: "User not found"

            });

        }

        res.status(200).json(profile);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Internal server error"

        });

    }

};

export const updateProfile = async (req, res) => {

    try {

        const updatedProfile = await saveProfile(req.body);

        res.status(200).json({

            message: "Profile updated successfully",

            data: updatedProfile

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Internal server error"

        });

    }

};