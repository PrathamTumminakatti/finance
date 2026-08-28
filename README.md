# AI Finance — Personal Finance Analytics & Forecasting Platform

## 1. Introduction

**AI Finance** is a full-stack personal finance application designed to help users record, analyze, and understand their spending patterns.

The application combines transaction management, financial analytics, expense visualization, historical spending analysis, expense forecasting, and rule-based financial recommendations in a single platform.

The project was developed to explore the practical application of **full-stack development, data analysis, time-series forecasting, and AI-assisted financial insights** in a real-world personal finance scenario.

Rather than simply displaying transaction records, the application processes historical spending data to provide users with a clearer view of their financial behavior and an estimate of future expenses.

---

## 2. Architecture

The application follows a **client-server architecture** with a separate frontend and backend.

```text
                    ┌──────────────────────────┐
                    │        User / Browser     │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     React Frontend       │
                    │                          │
                    │  • Dashboard             │
                    │  • Transactions           │
                    │  • Analytics              │
                    │  • Forecast               │
                    │  • Recommendations        │
                    │  • Profile                │
                    │  • Authentication         │
                    └────────────┬─────────────┘
                                 │
                              REST API
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     Node.js Backend      │
                    │                          │
                    │  • API Routes             │
                    │  • Controllers            │
                    │  • Services               │
                    │  • Database Models        │
                    │  • Analytics Logic        │
                    │  • Forecasting            │
                    │  • Recommendation Logic  │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      PostgreSQL          │
                    │                          │
                    │  • Users                 │
                    │  • Transactions          │
                    │  • Cashflow Snapshots    │
                    │  • Financial Data        │
                    └──────────────────────────┘
```

### Data Flow

```text
User
  │
  ▼
React Frontend
  │
  │ REST API Requests
  ▼
Node.js / Express Backend
  │
  ├── Authentication
  ├── Transaction Processing
  ├── Analytics
  ├── Forecasting
  └── Recommendations
  │
  ▼
PostgreSQL Database
  │
  ▼
Processed Financial Data
  │
  ▼
Frontend Visualizations & Insights
```

---

## 3. Tech Stack

### Frontend

* React
* JavaScript
* CSS
* React Router
* Axios
* Chart.js
* React Chart.js 2

### Backend

* Node.js
* Express.js
* JavaScript
* REST APIs
* Nodemon

### Database

* PostgreSQL
* SQL
* PostgreSQL `uuid`
* JSONB for structured transaction metadata

### Analytics & Machine Learning

* ARIMA time-series forecasting
* Historical spending analysis
* Category-based spending analysis
* Rule-based financial recommendations

---

## 4. Features

### Authentication

* User registration and login
* User-specific financial data
* Protected application functionality
* Profile management

### Dashboard

The dashboard provides an overview of the user's financial activity, including:

* Monthly income
* Expenses
* Disposable income
* Financial health information
* Top expense categories
* Savings opportunities
* Expense-related insights

### Transaction Management

Users can:

* Add financial transactions
* View transaction history
* Categorize transactions
* Store transaction descriptions
* Store transaction dates
* Track transaction amounts
* Work with transaction-related metadata

### Analytics

The analytics section provides:

* Financial summary
* Expense analysis
* Category-wise spending
* Monthly spending trends
* Cash-flow analysis
* Average transaction analysis
* Average monthly spending
* Spending insights

### Expense Visualization

The application provides graphical representations of financial data, including:

* Expense distribution by category
* Monthly expense trends
* Historical expense patterns

### Expense Forecasting

The application uses historical monthly expense data to generate a forecast for the upcoming month.

The forecasting functionality uses an **ARIMA-based time-series model**.

### Financial Recommendations

The application generates recommendations based on observed spending patterns, including:

* High spending categories
* Spending trends
* Disposable income
* Forecasted expenses
* Savings opportunities

The savings opportunity calculation uses a rule-based reduction scenario to estimate potential savings.

---

## 5. AI / ML Models

### ARIMA — AutoRegressive Integrated Moving Average

The primary machine-learning/time-series forecasting technique used in the project is **ARIMA**.

ARIMA is used to analyze historical monthly expense data and estimate the user's future expense level.

The forecasting process can be represented as:

```text
Historical Transactions
        │
        ▼
Monthly Expense Aggregation
        │
        ▼
Historical Monthly Time Series
        │
        ▼
ARIMA Model
        │
        ▼
Predicted Next-Month Expense
        │
        ▼
Forecast Visualization
```

### Why ARIMA?

ARIMA was selected because the project's forecasting problem is based on **historical monthly expense values**, making it a time-series forecasting problem.

The model can capture patterns in historical observations and use them to estimate a future value.

The project therefore uses ARIMA specifically for **expense forecasting**, rather than using a general-purpose classification or regression model.

### Rule-Based Financial Recommendations

Not every "AI" feature in the application is a machine-learning model.

The financial recommendation system also contains **rule-based logic** that evaluates:

* Spending ratios
* Category spending
* Monthly spending changes
* Disposable income
* Forecasted expenses

For example, savings opportunities use a predefined reduction scenario rather than a trained machine-learning model.

This distinction is intentional: the project combines **machine-learning forecasting with deterministic financial analysis rules**.

---

## 6. Database Design

The application uses **PostgreSQL** as its relational database.

### Users

The `users` table stores user account and financial profile information.

Important fields include:

| Field            | Description               |
| ---------------- | ------------------------- |
| `id`             | Unique user identifier    |
| `name`           | User's name               |
| `email`          | User's email address      |
| `monthly_income` | User's monthly income     |
| `currency`       | User's preferred currency |

### Transactions

The `transactions` table stores individual financial transactions.

Important fields include:

| Field              | Description                                    |
| ------------------ | ---------------------------------------------- |
| `id`               | Unique transaction identifier                  |
| `user_id`          | User associated with the transaction           |
| `amount`           | Transaction amount                             |
| `transaction_date` | Date of transaction                            |
| `description`      | Transaction description                        |
| `category`         | Expense category                               |
| `subcategory`      | Expense subcategory                            |
| `entities`         | JSONB transaction metadata                     |
| `is_anomalous`     | Indicates whether the transaction is anomalous |
| `anomaly_type`     | Type of detected anomaly                       |
| `is_recurring`     | Indicates recurring transactions               |
| `created_at`       | Record creation timestamp                      |

### Cashflow Snapshots

The application also uses financial snapshot data for cash-flow related information.

These records can contain information such as:

* Income
* Expenses
* Disposable income
* Snapshot date

### Relationship

The main relationship can be represented as:

```text
Users
  │
  │ 1
  │
  ├───────────────< Transactions
  │
  │
  └───────────────< Cashflow Snapshots
```

A user can therefore have multiple transactions and multiple financial snapshots.

---

## 7. Setup Instructions

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3.x
* pip
* PostgreSQL
* pgAdmin
* Git

---

### 7.1 Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ai-finance
```

---

### 7.2 Database Setup

1. Install and start PostgreSQL.
2. Create a database for the application.
3. Open the project database using pgAdmin.
4. Create the required database tables/schema.
5. Configure the database connection used by the backend.
6. Ensure the database is running before starting the application.

---

### 7.3 Backend Setup

Navigate to the backend:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Configure the backend environment variables.

Example:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

Use the exact environment-variable names defined by the project.

Start the backend:

```bash
npm run dev
```

---

### 7.4 ML Service Setup

The project contains a separate **ML service** responsible for the machine-learning/time-series forecasting functionality.

Navigate to the ML service directory:

```bash
cd ml-service
```

Create a Python virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

Start the ML service using the project's configured entry point.

For example, if the service uses `app.py`:

```bash
python app.py
```

If the project uses another entry file or startup command, use that command instead.

The ML service should be running before using the application's expense forecasting functionality.

---

### 7.5 Frontend Setup

Open another terminal and navigate to the client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by the development server.

---

### 7.6 Running the Complete Application

The application consists of three main services:

```text
Frontend
   │
   │ REST API
   ▼
Node.js Backend
   │
   ├──────────────► PostgreSQL
   │
   └──────────────► ML Service
                         │
                         ▼
                  Expense Forecast
```

For local development, keep the following services running:

**Terminal 1 — Backend**

```bash
cd server
npm run dev
```

**Terminal 2 — ML Service**

```bash
cd ml-service
# activate virtual environment first
python app.py
```

**Terminal 3 — Frontend**

```bash
cd client
npm run dev
```

The exact ML-service startup command should match the entry point configured in the project.

---

### 7.7 Environment Configuration

Do not commit sensitive configuration to the public repository.

Examples of values that should remain private:

```text
Database passwords
JWT secrets
API keys
Production credentials
Private service URLs
```

Use `.env` files locally and provide a `.env.example` file in the repository when appropriate.


### Database Setup

1. Install and start PostgreSQL.
2. Create a database for the application.
3. Configure the backend database connection.
4. Create the required application tables/schema.
5. Start the backend.
6. Register a user or use the provided demo credentials.

> **Important:** Never commit production database passwords, JWT secrets, API keys, or other sensitive credentials to GitHub.

---

## 8. Demo Credentials

A demo account is provided for testing the application.

### Login

```text
Email:
pqrs@gmail.com
```

Try either of the following passwords:

```text
PQRS@123
```

or

```text
pqrs@123
```

After logging in, the demo account can be used to explore the application's transaction data, analytics, forecasting, dashboard, and recommendation functionality.

> **Note:** These are demo credentials intended for the public project. Do not use real financial or personally sensitive information with a publicly accessible demonstration account.

---

## 9. Conclusion

AI Finance demonstrates how a personal finance application can combine **full-stack web development, relational database management, financial analytics, data visualization, time-series forecasting, and rule-based recommendations**.

The project focuses on transforming transaction history into useful financial information rather than simply storing transactions.

The forecasting component uses ARIMA to estimate future expenses, while the analytics and recommendation components help users understand spending patterns and identify areas where spending could potentially be reduced.

The project also provided practical experience in connecting frontend applications with backend services, working with PostgreSQL, processing historical financial data, implementing forecasting workflows, and presenting analytical results through an interactive web interface.

---

## 10. License

Copyright © 2026 Pratham Tumminakatti

This project was developed and maintained by Pratham Tumminakatti.

All rights reserved. Unauthorized copying, modification, distribution,
or reproduction of this project or substantial portions of its source code
is prohibited without permission.
