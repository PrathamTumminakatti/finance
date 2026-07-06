import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Forecast from "./pages/Forecast";
import Recommendations from "./pages/Recommendations";
import FinancialHealth from "./pages/FinancialHealth";
import Profile from "./pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/transactions"
                    element={<Transactions />}
                />

                <Route
                    path="/analytics"
                    element={<Analytics />}
                />

                <Route
                    path="/forecast"
                    element={<Forecast />}
                />

                <Route
                    path="/recommendations"
                    element={<Recommendations />}
                />

                <Route
                    path="/financial-health"
                    element={<FinancialHealth />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;