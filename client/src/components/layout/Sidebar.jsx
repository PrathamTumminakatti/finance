import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaMoneyBillWave,
    FaChartPie,
    FaChartLine,
    FaBrain,
    FaHeartbeat,
    FaUser
} from "react-icons/fa";

import "./styles/Sidebar.css";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2 className="logo">
                FinanceAI
            </h2>

            <nav>

                <NavLink to="/dashboard">
                    <FaHome />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/transactions">
                    <FaMoneyBillWave />
                    <span>Transactions</span>
                </NavLink>

                <NavLink to="/analytics">
                    <FaChartPie />
                    <span>Analytics</span>
                </NavLink>

                <NavLink to="/forecast">
                    <FaChartLine />
                    <span>Forecast</span>
                </NavLink>

                <NavLink to="/recommendations">
                    <FaBrain />
                    <span>Recommendations</span>
                </NavLink>

                <NavLink to="/financial-health">
                    <FaHeartbeat />
                    <span>Financial Health</span>
                </NavLink>

                <NavLink to="/profile">
                    <FaUser />
                    <span>Profile</span>
                </NavLink>

            </nav>

        </div>

    );

}

export default Sidebar;