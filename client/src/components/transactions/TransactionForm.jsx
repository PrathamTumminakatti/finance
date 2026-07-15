import { useState } from "react";

import ConfirmationDialog from "../common/ConfirmationDialog";
import { addTransaction } from "../../services/transactionService";
import toast from "react-hot-toast";

function TransactionForm({
    userId,
    onTransactionAdded
}) {

    const [showDialog, setShowDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({

        transaction_date: "",

        amount: "",

        description: ""

    });

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const handleSubmit = (event) => {

        event.preventDefault();

        setShowDialog(true);

    };

    const handleConfirm = async () => {

    try {

        setIsSubmitting(true);

        await addTransaction({

            user_id: userId,

            transaction_date: formData.transaction_date,

            amount: Number(formData.amount),

            description: formData.description

        });

        toast.success("Transaction added successfully.");

        setFormData({

            transaction_date: "",

            amount: "",

            description: ""

        });

        await onTransactionAdded();

    }

    catch (error) {

        console.error(error);

        toast.error("Failed to add transaction.");

    }

    finally {

        setIsSubmitting(false);

        setShowDialog(false);

    }

};

    return (

        <div className="transaction-form">

            <h2>Add Transaction</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="date"
                    name="transaction_date"
                    value={formData.transaction_date}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    Add Transaction

                </button>

            </form>

            <div className="transaction-warning">

                <strong>⚠️ Important</strong>

                <p>

                    This system maintains a transparent and immutable
                    financial history to ensure accurate AI analysis,
                    forecasting and recommendations.

                    Once a transaction is submitted, it cannot be
                    edited or deleted.

                    Please verify the date, amount and description
                    carefully before adding the transaction.

                </p>

            </div>

            <ConfirmationDialog

    isOpen={showDialog}

    title="Confirm Transaction"

    message="Please verify the transaction details carefully. Once submitted, this transaction cannot be edited or deleted."

    onConfirm={handleConfirm}

    onCancel={() => setShowDialog(false)}

    isSubmitting={isSubmitting}

/>
        </div>

    );

}

export default TransactionForm;