import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function LoginForm() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({

        email: "",

        password: ""

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

            const data = await loginService(formData);

            login(data);

            navigate("/");

        }

        catch (err) {

            console.error(err);

            alert(

                err.response?.data?.error ||

                "Login failed."

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

            <h2>Login</h2>

            <label>Email</label>

            <input

                type="email"

                name="email"

                value={formData.email}

                onChange={handleChange}

                required

            />

            <label>Password</label>

            <input

                type="password"

                name="password"

                value={formData.password}

                onChange={handleChange}

                required

            />

            <button

                type="submit"

                disabled={loading}

            >

                {

                    loading

                        ?

                        "Logging in..."

                        :

                        "Login"

                }

            </button>
            <p>

    Don't have an account?

    {" "}

    <Link to="/register">

        Register

    </Link>

</p>

        </form>

    );

}

export default LoginForm;