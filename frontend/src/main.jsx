import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/context";
import { MapProvider } from "./context/roadmap/map-provider.jsx";
import { MainProvider } from "./context/main/main-provider.jsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <MainProvider>
            <MapProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </MapProvider>
          </MainProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
