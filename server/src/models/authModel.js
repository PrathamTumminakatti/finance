import pool from "../config/db.js";

export const findUserByEmail = async (email) => {

    const query = `
        SELECT *
        FROM users
        WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];

};

export const createUser = async (user) => {

    const query = `
        INSERT INTO users (

            name,

            email,

            password_hash,

            monthly_income,

            currency

        )

        VALUES ($1,$2,$3,$4,$5)

        RETURNING

            id,

            name,

            email,

            monthly_income,

            currency;
    `;

    const values = [

        user.name,

        user.email,

        user.password_hash,

        user.monthly_income,

        user.currency

    ];

    const result = await pool.query(query, values);

    return result.rows[0];

};