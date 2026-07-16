import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import ProfileForm from "../components/profile/ProfileForm";
import { useAuth } from "../context/AuthContext";

import {

    getProfile

} from "../services/profileService";

import "../components/profile/styles/Profile.css";

function Profile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const { user } = useAuth();

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const data = await getProfile(user.id)

                setProfile(data);

            }

            catch (err) {

                console.error(err);

                setError("Failed to load profile.");

            }

            finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, [user]);

    return (

        <MainLayout>

            <div className="profile-container">

                <h1>Profile</h1>

                {

                    loading

                        ?

                        <p>Loading...</p>

                        :

                        error

                            ?

                            <p>{error}</p>

                            :

                            <ProfileForm

                                profile={profile}

                            />

                }

            </div>

        </MainLayout>

    );

}

export default Profile;