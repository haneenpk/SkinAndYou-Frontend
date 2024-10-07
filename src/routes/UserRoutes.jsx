import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/user/Home";

// const Profile = lazy(() => import("../pages/Users/Profile"));
// const EditProfile = lazy(() => import("../pages/Users/EditProfile"));
// const Upcoming = lazy(() => import("../pages/Users/upcoming"));
// const ShowTime = lazy(() => import("../pages/Users/showTime"));
// const ShowSeats = lazy(() => import("../pages/Users/showSeats"));
// const ShowCheckout = lazy(() => import("../pages/Users/showCheckout"));
// const Chat = lazy(() => import("../pages/Users/Chat"));
// const BookingSuccess = lazy(() => import("../pages/Users/BookingSuccess"));
// const BookingHistory = lazy(() => import("../pages/Users/BookingHistory"));
// const Wallet = lazy(() => import("../pages/Users/Wallet"));

import ErrorPage from "../pages/ErrorPage";


const UserRoutes = () => {

    const usersRoutes = [
        { path: "/", element: <Home decide={"home"} /> },
        { path: "/home", element: <Home decide={"home"} /> },
    ];

    return (
        <Routes>
            {usersRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {/* Error Page */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default UserRoutes;
