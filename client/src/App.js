import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Forecast from "./pages/Forecast";
import Recommendations from "./pages/Recommendations";
import FinancialHealth from "./pages/FinancialHealth";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Register from "./pages/Register";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/transactions"
                    element={
                        <ProtectedRoute>
                            <Transactions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <Analytics />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/forecast"
                    element={
                        <ProtectedRoute>
                            <Forecast />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recommendations"
                    element={
                        <ProtectedRoute>
                            <Recommendations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/financial-health"
                    element={
                        <ProtectedRoute>
                            <FinancialHealth />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/register"
    element={<Register />}
/>

            </Routes>

        </BrowserRouter>

    );

}

export default App;