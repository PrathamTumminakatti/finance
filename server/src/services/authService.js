import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {

    findUserByEmail,

    createUser

} from "../models/authModel.js";

const SALT_ROUNDS = 10;

export const registerUser = async (user) => {

    const existing = await findUserByEmail(user.email);

    if (existing) {

        throw new Error("Email already exists");

    }

    const password_hash = await bcrypt.hash(

        user.password,

        SALT_ROUNDS

    );

    return await createUser({

        ...user,

        password_hash

    });

};

export const loginUser = async (

    email,

    password

) => {

    const user = await findUserByEmail(email);

    if (!user) {

        throw new Error("Invalid credentials");

    }

    const valid = await bcrypt.compare(

        password,

        user.password_hash

    );

    if (!valid) {

        throw new Error("Invalid credentials");

    }

    const token = jwt.sign(

        {

            id: user.id,

            email: user.email

        },

        process.env.JWT_SECRET,

        {

            expiresIn:

                process.env.JWT_EXPIRES_IN

        }

    );

    return {

        token,

        user: {

            id: user.id,

            name: user.name,

            email: user.email,

            monthly_income: user.monthly_income,

            currency: user.currency

        }

    };

};