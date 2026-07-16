import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import ForecastSummary from "../components/forecast/ForecastSummary";
import ForecastInterpretation from "../components/forecast/ForecastInterpretation";
import ForecastChart from "../components/charts/ForecastChart";

import { getForecast } from "../services/forecastService";
import { useAuth } from "../context/AuthContext";

import "../components/forecast/styles/Forecast.css";

function Forecast() {

    const [forecast, setForecast] = useState(null);

    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const [error, setError] = useState("");

    useEffect(() => {

    if (!user) return;

    const fetchForecast = async () => {

        try {

            setLoading(true);

            const data = await getForecast(user.id);

            console.log("Forecast Response:", data);

            setForecast(data);

        }

        catch (err) {

            console.error(err);

            setError("Failed to load forecast.");

        }

        finally {

            setLoading(false);

        }

    };

    fetchForecast();

}, [user]);

    return (

        <MainLayout>

            <div className="forecast-container">

                <h1>Forecast</h1>

                {

                    loading

                        ? <p>Loading...</p>

                        : error

                            ? <p>{error}</p>

                            :

                            <>

                                {

    forecast?.forecast ? (

        <>

            <ForecastSummary

                forecast={forecast.forecast}

            />

            <ForecastChart

                forecast={forecast}

            />

            <ForecastInterpretation

                forecast={forecast.forecast}

            />

        </>

    ) : (

        <div className="forecast-empty">

            <h3>No Forecast Available</h3>

            <p>

                You don't have enough transaction history
                to generate an expense forecast yet.

            </p>

        </div>

    )

}

                            </>

                }

            </div>

        </MainLayout>

    );

}

export default Forecast;