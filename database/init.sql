CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    monthly_income NUMERIC(12,2),
    currency VARCHAR(10) DEFAULT 'INR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    amount NUMERIC(12,2) NOT NULL,
    transaction_date DATE NOT NULL,

    description TEXT,

    -- NLP OUTPUT
    category VARCHAR(50),
    subcategory VARCHAR(50),
    entities JSONB,

    -- ANOMALY DETECTION
    is_anomalous BOOLEAN DEFAULT FALSE,
    anomaly_type VARCHAR(50),

    -- SYSTEM FLAGS
    is_recurring BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE category_baselines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    category VARCHAR(50),
    avg_monthly_spend NUMERIC(12,2),
    std_dev NUMERIC(12,2),

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    goal_name VARCHAR(100),
    target_amount NUMERIC(14,2),
    current_savings NUMERIC(14,2) DEFAULT 0,

    start_date DATE,
    target_date DATE,

    goal_type VARCHAR(50), -- short_term / long_term

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE goal_trajectory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID REFERENCES financial_goals(id) ON DELETE CASCADE,

    required_monthly_savings NUMERIC(12,2),
    projected_completion_date DATE,

    last_calculated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cashflow_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    snapshot_date DATE,

    total_income NUMERIC(12,2),
    total_expenses NUMERIC(12,2),
    disposable_income NUMERIC(12,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forecasts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    forecast_month DATE,
    predicted_expense NUMERIC(12,2),
    predicted_savings NUMERIC(12,2),

    model_type VARCHAR(50), -- ARIMA / LSTM

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nudges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    message TEXT,
    severity VARCHAR(20), -- info / warning / critical

    related_transaction_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE investment_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    type VARCHAR(50), -- FD / SIP

    recommended_amount NUMERIC(12,2),
    expected_return NUMERIC(12,2),

    duration_months INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

