import "./styles/SavingsSection.css";

function SavingsSection({ opportunities }) {

    return (

        <div className="savings-section">

            <h2>Savings Opportunities</h2>

            {

                opportunities.length === 0 ? (

                    <p>No savings opportunities detected.</p>

                ) : (

                    opportunities.map((item, index) => (

                        <div
                            key={index}
                            className="saving-card"
                        >

                            <h3>{item.category}</h3>

                            <p>

                                Current Spending :
                                <strong> ₹{item.currentSpending}</strong>

                            </p>

                            <p>

                                Suggested Reduction :
                                <strong> ₹{item.suggestedReduction}</strong>

                            </p>

                            <p>

                                Potential Savings :
                                <strong> ₹{item.potentialSavings}</strong>

                            </p>

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default SavingsSection;