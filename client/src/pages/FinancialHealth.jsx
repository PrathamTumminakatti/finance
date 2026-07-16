import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import HealthScore from "../components/financialHealth/HealthScore";
import HealthFactors from "../components/financialHealth/HealthFactors";
import HealthRecommendations from "../components/financialHealth/HealthRecommendations";

import { getRecommendations } from "../services/recommendationService";
import { useAuth } from "../context/AuthContext";

import "../components/financialHealth/styles/FinancialHealth.css";

function FinancialHealth() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const { user } = useAuth();

    useEffect(() => {

        const fetchHealth = async () => {

            try {

                const result = await getRecommendations(user.id)

                setData(result);

            }

            catch (err) {

                console.error(err);

                setError("Failed to load financial health.");

            }

            finally {

                setLoading(false);

            }

        };

        fetchHealth();

    }, [user]);

    return (

        <MainLayout>

            <div className="financial-health-container">

                <h1>Financial Health</h1>

                {

                    loading

                        ?

                        <p>Loading...</p>

                        :

                        error

                            ?

                            <p>{error}</p>

                            :

                            <>

                                <HealthScore

                                    health={data.financialHealth}

                                />

                                <HealthFactors

                                    metrics={data.metrics}

                                />

                                <HealthRecommendations

                                    recommendations={data.recommendations}

                                />

                            </>

                }

            </div>

        </MainLayout>

    );

}


export default FinancialHealth;