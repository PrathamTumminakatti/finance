function HealthRecommendations({ recommendations }) {

    return (

        <div className="health-card">

            <h2>Recommendations</h2>

            {

                recommendations.map((item, index) => (

                    <div
                        key={index}
                        className="health-recommendation"
                    >

                        <h4>{item.title}</h4>

                        <p>{item.recommendation}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default HealthRecommendations;