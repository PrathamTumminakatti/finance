import "./styles/TopCategoriesSection.css";

function TopCategoriesSection({ categories }) {

    return (

        <div className="top-categories">

            <h2>Top Expense Categories</h2>

            <table>

                <thead>

                    <tr>

                        <th>Category</th>

                        <th>Amount</th>

                        <th>Percentage</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        categories.length > 0 ? (

                        categories.map((category, index) => (

                            <tr key={index}>

                                <td>{category.category}</td>

                                <td>₹{category.amount}</td>

                                <td>{category.percentage}%</td>

                            </tr>

                        ))
                        ) : (
                            <tr>
                                <td colSpan="3">No categories available.</td>
                            </tr>
                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default TopCategoriesSection;