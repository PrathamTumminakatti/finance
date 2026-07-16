function HealthScore({ health }) {

    const score = health.score;

    return (

        <div className="health-card">

            <h2>Overall Financial Health</h2>

            <div className="health-score">

                <h1>{score}/100</h1>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{ width: `${score}%` }}
                    />

                </div>

                <h3>{health.status}</h3>

            </div>

        </div>

    );

}

export default HealthScore;