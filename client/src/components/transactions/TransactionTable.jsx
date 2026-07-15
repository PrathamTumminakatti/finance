import { formatCurrency } from "../../utils/formatCurrency";

function TransactionTable({ transactions }) {

    return (

        <div className="transaction-table">

            <h2>Transaction History</h2>

            <table>

                <thead>

                    <tr>

                        <th>Date</th>

                        <th>Category</th>

                        <th>Description</th>

                        <th>Amount</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        transactions?.length > 0 ? (

                            transactions.map((transaction) => (

                                <tr key={transaction.id}>

                                    <td>

                                        {

                                            new Date(
                                                transaction.transaction_date
                                            ).toLocaleDateString("en-IN")

                                        }

                                    </td>

                                    <td>

                                        {transaction.category}

                                    </td>

                                    <td>

                                        {transaction.description}

                                    </td>

                                    <td>

                                        {

                                            formatCurrency(
                                                transaction.amount
                                            )

                                        }

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="4">

                                    No transactions available.

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default TransactionTable;