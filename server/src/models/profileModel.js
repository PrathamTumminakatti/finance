import pool from "../config/db.js";

export const getUserProfile = async (userId) => {

    const query = `
        SELECT
            id,
            name,
            email,
            monthly_income,
            currency
        FROM users
        WHERE id = $1;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows[0];

};

export const updateUserProfile = async (profile) => {

    const query = `
        UPDATE users
        SET

            name = $1,

            email = $2,

            monthly_income = $3,

            currency = $4

        WHERE id = $5

        RETURNING *;
    `;

    const values = [

        profile.name,

        profile.email,

        profile.monthly_income,

        profile.currency,

        profile.id

    ];

    const result = await pool.query(query, values);

    return result.rows[0];

};