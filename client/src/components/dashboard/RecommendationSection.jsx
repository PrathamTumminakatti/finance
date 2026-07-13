import "./styles/RecommendationSection.css";

function RecommendationSection({ recommendations }) {

    return (

        <div className="recommendation-section">

            <h2>AI Recommendations</h2>
            
                {
                    recommendations.length>0?(
                    recommendations.map((item, index) => (

                        <div
                            key={index}
                            className={`recommendation-card ${item.type}`}
                        >

                        <h3>{item.title}</h3>

                        <p>{item.description}</p>

                        <strong>
                            Recommendation:
                        </strong>

                        <p>{item.recommendation}</p>

                    </div>

                ))
                ):(
                    <p>No recommendations available at the moment.</p>
                )
            }

        </div>

    );

}

export default RecommendationSection;