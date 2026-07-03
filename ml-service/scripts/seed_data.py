import random
import requests
import calendar
from datetime import date

EXPENSE_CATALOG = {
    "Food": [
        {"description": "Grocery Shopping", "min": 1200, "max": 3500},
        {"description": "Restaurant Dinner", "min": 500, "max": 1800},
        {"description": "Milk & Dairy", "min": 100, "max": 500},
        {"description": "Vegetables & Fruits", "min": 300, "max": 1200},
        {"description": "Bakery Purchase", "min": 200, "max": 800}
    ],

    "Travel": [
        {"description": "Petrol Refill", "min": 800, "max": 3500},
        {"description": "Bus Ticket", "min": 50, "max": 500},
        {"description": "Train Ticket", "min": 300, "max": 2500},
        {"description": "Trip to Bengaluru", "min": 3000, "max": 12000},
        {"description": "Cab Ride", "min": 150, "max": 700}
    ],

    "Healthcare": [
        {"description": "Doctor Consultation", "min": 500, "max": 2000},
        {"description": "Medicine Purchase", "min": 300, "max": 2500},
        {"description": "Health Checkup", "min": 1500, "max": 5000}
    ],

    "Shopping": [
        {"description": "Amazon Purchase", "min": 500, "max": 5000},
        {"description": "Clothing Shopping", "min": 800, "max": 6000},
        {"description": "Footwear Purchase", "min": 700, "max": 3500}
    ],

    "Home Appliances": [
        {"description": "Mixer Grinder", "min": 2500, "max": 6000},
        {"description": "Microwave Oven", "min": 6000, "max": 15000},
        {"description": "Water Purifier Service", "min": 1000, "max": 3500}
    ],

    "Bills & Utilities": [
        {"description": "Electricity Bill", "min": 1200, "max": 3500},
        {"description": "Water Bill", "min": 300, "max": 900},
        {"description": "Internet Recharge", "min": 600, "max": 1500},
        {"description": "Mobile Recharge", "min": 250, "max": 700},
        {"description": "Gas Cylinder", "min": 900, "max": 1500}
    ],

    "Entertainment": [
        {"description": "Movie Night", "min": 300, "max": 1200},
        {"description": "OTT Subscription", "min": 199, "max": 999},
        {"description": "Gaming Purchase", "min": 500, "max": 3000}
    ],

    "Education": [
        {"description": "Online Course", "min": 1000, "max": 7000},
        {"description": "Books Purchase", "min": 300, "max": 2500},
        {"description": "Exam Fee", "min": 500, "max": 3000}
    ],

    "Emergency Fund": [
        {"description": "Emergency Savings Deposit", "min": 1000, "max": 10000}
    ],

    "Others": [
        {"description": "Miscellaneous Expense", "min": 100, "max": 1500}
    ]
}

CATEGORY_WEIGHTS = {
    "Food": 30,
    "Bills & Utilities": 20,
    "Travel": 10,
    "Shopping": 10,
    "Healthcare": 5,
    "Entertainment": 8,
    "Education": 5,
    "Home Appliances": 4,
    "Emergency Fund": 3,
    "Others": 5
}

API_URL = "http://localhost:5000/api/transactions/add"

USER_ID = "11111111-1111-1111-1111-111111111111"


def generate_transaction(user_id, category, transaction_date):
    expense = random.choice(EXPENSE_CATALOG[category])

    amount = round(
        random.uniform(
            expense["min"],
            expense["max"]
        ),
        2
    )

    return {
        "user_id": user_id,
        "transaction_date": transaction_date,
        "description": expense["description"],
        "amount": amount
    }


def choose_category():
    categories = list(CATEGORY_WEIGHTS.keys())
    weights = list(CATEGORY_WEIGHTS.values())

    return random.choices(
        categories,
        weights=weights,
        k=1
    )[0]


def generate_month_transactions(user_id, year, month):
    transactions = []

    days_in_month = calendar.monthrange(year, month)[1]

    transaction_count = random.randint(10, 15)

    for _ in range(transaction_count):
        category = choose_category()

        day = random.randint(1, days_in_month)

        transaction_date = date(year, month, day)

        transaction = generate_transaction(
            user_id,
            category,
            transaction_date
        )

        transactions.append(transaction)
        transactions.sort(
    key=lambda transaction: transaction["transaction_date"]
)

    return transactions
def seed_transactions():
    start_year = 2025
    start_month = 7

    current_year = start_year
    current_month = start_month

    for _ in range(12):

        monthly_transactions = generate_month_transactions(
            USER_ID,
            current_year,
            current_month
        )

        for transaction in monthly_transactions:

            payload = {
                **transaction,
                "transaction_date": transaction["transaction_date"].isoformat()
            }

            try:
                response = requests.post(
                    API_URL,
                    json=payload,
                    timeout=10
                )

                if response.status_code != 201:
                    print(
                        f"Failed: {payload['description']} "
                        f"({response.status_code})"
                    )

            except Exception as e:
                print(
                    f"Seeder Error: {e}"
                )

        current_month += 1

        if current_month > 12:
            current_month = 1
            current_year += 1

    print("✅ Historical transaction seeding completed.")
if __name__ == "__main__":
    seed_transactions()