import os
import pandas as pd
import psycopg2

from dotenv import load_dotenv
from statsmodels.tsa.arima.model import ARIMA

load_dotenv()


def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )


def get_monthly_expenses(user_id: str):

    conn = get_db_connection()

    query = """
        SELECT
            DATE_TRUNC('month', transaction_date) AS month,
            SUM(amount) AS total_expense
        FROM transactions
        WHERE user_id = %s
        GROUP BY month
        ORDER BY month;
    """

    df = pd.read_sql_query(
        query,
        conn,
        params=[user_id]
    )

    conn.close()

    return df


def train_arima_model(expense_series):

    model = ARIMA(
        expense_series,
        order=(1, 1, 1)
    )

    fitted_model = model.fit()

    return fitted_model


def predict_next_month(fitted_model):

    forecast = fitted_model.forecast(steps=1)

    return float(forecast.iloc[0])


def generate_forecast(user_id: str):

    df = get_monthly_expenses(user_id)

    if len(df) < 6:
        raise ValueError(
            "At least 6 months of historical data is required."
        )

    expense_series = df["total_expense"]

    model = train_arima_model(expense_series)

    prediction = predict_next_month(model)

    # Convert Timestamp objects into strings for JSON serialization
    df["month"] = df["month"].dt.strftime("%Y-%m-%d")

    return {
        "predicted_expense": round(prediction, 2),
        "historical_data": df.to_dict(orient="records")
    }


if __name__ == "__main__":

    USER_ID = "11111111-1111-1111-1111-111111111111"

    forecast = generate_forecast(USER_ID)

    print("\n========== FORECAST RESULT ==========\n")
    print(forecast)