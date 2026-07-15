import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(

    <React.StrictMode>

        <App />

        <Toaster

            position="top-right"

            reverseOrder={false}

            toastOptions={{

                duration: 3000,

                style: {

                    background: "#ffffff",

                    color: "#111827",

                    borderRadius: "10px",

                    padding: "14px",

                    fontSize: "14px"

                },

                success: {

                    style: {

                        border: "1px solid #22c55e"

                    }

                },

                error: {

                    style: {

                        border: "1px solid #ef4444"

                    }

                }

            }}

        />

    </React.StrictMode>

);