function SpendingInsights({ insights }) {

    return (

        <div className="summary-card">

            <h2>AI Spending Insights</h2>

            {

                insights?.length > 0 ? (

                    insights.map(

                        (item, index) => (

                            <div

                                key={index}

                                className={`insight ${item.type}`}

                            >

                                <p>

                                    {item.message}

                                </p>

                            </div>

                        )

                    )

                ) : (

                    <p>

                        No insights available.

                    </p>

                )

            }

        </div>

    );

}

export default SpendingInsights;