import MainLayout from "../components/layout/MainLayout";
import RegisterForm from "../components/auth/RegisterForm";

import "../components/auth/styles/Auth.css";

function Register() {

    return (

        <MainLayout>

            <div className="auth-container">

                <RegisterForm />

            </div>

        </MainLayout>

    );

}

export default Register;