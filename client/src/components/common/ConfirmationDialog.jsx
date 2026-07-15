import "./ConfirmationDialog.css";

function ConfirmationDialog({

    isOpen,

    title,

    message,

    onConfirm,

    onCancel,

    isSubmitting

}){

    if (!isOpen) return null;

    return (

        <div className="dialog-overlay">

            <div className="dialog-box">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="dialog-buttons">

                    <button

    className="confirm-btn"

    onClick={onConfirm}

    disabled={isSubmitting}

>

    {

        isSubmitting

            ? "Adding Transaction..."

            : "Confirm"

    }

</button>

                    <button

    className="confirm-btn"

    onClick={onConfirm}

    disabled={isSubmitting}

>

    {

        isSubmitting

            ? "Adding Transaction..."

            : "Confirm"

    }

</button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmationDialog;