import {

    registerUser,

    loginUser

} from "../services/authService.js";

export const register = async (req, res) => {

    try {

        const user = await registerUser(req.body);

        res.status(201).json({

            message: "Registration successful",

            user

        });

    }

    catch (error) {

        console.error(error);

        res.status(400).json({

            error: error.message

        });

    }

};

export const login = async (req, res) => {

    try {

        const {

            email,

            password

        } = req.body;

        const result = await loginUser(

            email,

            password

        );

        res.status(200).json(result);

    }

    catch (error) {

        console.error(error);

        res.status(401).json({

            error: error.message

        });

    }

};