import MainLayout from "../components/layout/MainLayout";
import LoginForm from "../components/auth/LoginForm";

import "../components/auth/styles/Auth.css";

function Login() {

    return (

        <MainLayout>

            <div className="auth-container">

                <LoginForm />

            </div>

        </MainLayout>

    );

}

export default Login;