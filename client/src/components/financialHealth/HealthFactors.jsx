function HealthFactors({ metrics }) {

    return (

        <div className="health-card">

            <h2>Financial Health Factors</h2>

            <table className="health-table">

                <tbody>

                    <tr>

                        <td>Forecast</td>

                        <td>{metrics.forecast.forecastStatus}</td>

                    </tr>

                    <tr>

                        <td>Disposable Income</td>

                        <td>{metrics.disposableIncome.savingsStatus}</td>

                    </tr>

                    <tr>

                        <td>Monthly Trend</td>

                        <td>{metrics.monthlyTrend.trend}</td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default HealthFactors;