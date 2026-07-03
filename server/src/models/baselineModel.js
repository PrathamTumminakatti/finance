    import pool from '../config/db.js';

/*
    Returns the existing baseline
    for a user and category.
*/
export const getBaseline = async (userId, category) => {

    const result = await pool.query(
        `
        SELECT *
        FROM category_baselines
        WHERE user_id = $1
        AND category = $2
        `,
        [userId, category]
    );

    return result.rows[0];
};


/*
    Updates an existing baseline.
*/
export const updateBaseline = async (
    baselineId,
    totalSpent,
    transactionCount,
    averageSpend
) => {

    return pool.query(
        `
        UPDATE category_baselines
        SET
            total_spent = $1,
            transaction_count = $2,
            avg_monthly_spend = $3,
            last_updated = CURRENT_TIMESTAMP
        WHERE id = $4
        `,
        [
            totalSpent,
            transactionCount,
            averageSpend,
            baselineId
        ]
    );

};


/*
    Creates a new baseline.
*/
export const createBaseline = async (
    userId,
    category,
    totalSpent,
    transactionCount,
    averageSpend
) => {

    return pool.query(
        `
        INSERT INTO category_baselines
        (
            user_id,
            category,
            total_spent,
            transaction_count,
            avg_monthly_spend,
            std_dev
        )

        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            0
        )
        `,
        [
            userId,
            category,
            totalSpent,
            transactionCount,
            averageSpend
        ]
    );

};