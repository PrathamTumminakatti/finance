import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import RecommendationCard from "../components/recommendations/RecommendationCard";
import RecommendationFilters from "../components/recommendations/RecommendationFilters";

import { getRecommendations } from "../services/recommendationService";
import { useAuth } from "../context/AuthContext";

import "../components/recommendations/styles/Recommendations.css";

function Recommendations() {

    const [recommendations, setRecommendations] = useState([]);
    const [priority, setPriority] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { user } = useAuth();

    useEffect(() => {

        if (!user) return;

        const fetchRecommendations = async () => {

            try {

                const data = await getRecommendations(user.id);

                setRecommendations(data.recommendations);

            }

            catch (err) {

                console.error(err);

                setError("Failed to load recommendations.");

            }

            finally {

                setLoading(false);

            }

        };

        fetchRecommendations();

    }, [user]);

    const filteredRecommendations =

        priority === "All"

            ? recommendations

            : recommendations.filter(

                (item) =>

                    item.priority === priority.toLowerCase()

            );

    return (

        <MainLayout>

            <div className="recommendations-container">

                <h1>Recommendations</h1>

                <RecommendationFilters

                    priority={priority}

                    setPriority={setPriority}

                />

                {

                    loading ? (

                        <p>Loading...</p>

                    ) : error ? (

                        <p>{error}</p>

                    ) : (

                        filteredRecommendations.map((item, index) => (

                            <RecommendationCard

                                key={index}

                                recommendation={item}

                            />

                        ))

                    )

                }

            </div>

        </MainLayout>

    );

}

export default Recommendations;