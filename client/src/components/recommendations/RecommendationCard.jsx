function RecommendationCard({ recommendation }) {

    return (

        <div className="recommendation-card">

            <div className="recommendation-header">

                <span

                    className={`priority-badge ${recommendation.priority}`}

                >

                    {recommendation.priority.toUpperCase()}

                </span>

                <span className="recommendation-category">

                    {recommendation.category}

                </span>

            </div>

            <h2>

                {recommendation.title}

            </h2>

            <p>

                <strong>Description:</strong>

                {" "}

                {recommendation.description}

            </p>

            <p>

                <strong>Recommendation:</strong>

                {" "}

                {recommendation.recommendation}

            </p>

            <p>

                <strong>Expected Impact:</strong>

                {" "}

                {recommendation.impact}

            </p>

        </div>

    );

}

export default RecommendationCard;