import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../../services/authService";

function RegisterForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

        monthly_income: "",

        currency: "INR"

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await register(formData);

            alert("Registration successful.");

            navigate("/login");

        }

        catch (err) {

            alert(

                err.response?.data?.error ||

                "Registration failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form
            className="auth-card"
            onSubmit={handleSubmit}
        >

            <h2>Create Account</h2>

            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="monthly_income"
                placeholder="Monthly Income"
                value={formData.monthly_income}
                onChange={handleChange}
                required
            />

            <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
            >

                <option value="INR">INR</option>

                <option value="USD">USD</option>

                <option value="EUR">EUR</option>

            </select>

            <button
                type="submit"
                disabled={loading}
            >

                {

                    loading

                        ?

                        "Creating..."

                        :

                        "Register"

                }

            </button>

            <p>

                Already have an account?

                {" "}

                <Link to="/login">

                    Login

                </Link>

            </p>

        </form>

    );

}

export default RegisterForm;