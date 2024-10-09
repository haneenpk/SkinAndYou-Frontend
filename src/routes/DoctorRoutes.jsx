import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const DoctorHome = lazy(() => import("../pages/doctor/Home"));
const Appoinment = lazy(() => import("../pages/doctor/Appoinment"));
import Login from "../pages/doctor/Auth/Login";
import ErrorPage from "../pages/ErrorPage";

const DoctorRoutes = ({ isLoggedIn }) => {

    return (
        <Routes>
            <Route
                path="/"
                element={isLoggedIn ? <DoctorHome /> : <Navigate to="/doctor/login" />}
            />
            <Route
                path="/login"
                element={!isLoggedIn ? <Login /> : <Navigate to="/doctor" />}
            />
            <Route
                path="/appoinment"
                element={isLoggedIn ? <Appoinment /> : <Navigate to="/doctor/login" />}
            />
            <Route
                path="/*"
                element={<ErrorPage />}
            />
        </Routes>
    );
};

export default DoctorRoutes;