import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainRouter from "../routes/MainRouter";
import DoctorHeader from "../components/doctor/Header";
import Header from "../components/users/Header";
import Footer from "../components/users/Footer";
import { setLoggedIn, setDoctorData } from "../redux/slices/doctorSlice";
import { checkToDisplayHeaderFooter } from "../utils/routeUtil";
import { userRoutesToCheck, doctorRoutesToCheck } from "../config/routesConfig";

function Layout() {

    const dispatch = useDispatch();
    const location = useLocation();
    const isDoctorLoggedIn = useSelector(state => state.doctor.isLoggedIn);

    let userRole = location.pathname.startsWith("/doctor") ? "doctor" : "user";

    const shouldDisplayHeaderFooter = checkToDisplayHeaderFooter(
        userRole === "doctor" ? doctorRoutesToCheck : userRoutesToCheck,
        location
    );

    // Ensure login state is rehydrated on page load
    useEffect(() => {
        const jwtToken = localStorage.getItem(`${userRole}JwtToken`);
        const doctorData = localStorage.getItem("doctorData");

        if (jwtToken) {
            if (userRole === "doctor") {
                dispatch(setLoggedIn(true));
                dispatch(setDoctorData(doctorData));
            }
        }
    }, [dispatch, userRole]);  // useEffect should run once based on userRole

    return (
        <div className="flex flex-col min-h-screen">
            {shouldDisplayHeaderFooter && (
                userRole === "doctor" ? <DoctorHeader /> : <Header />
            )}
            <main className="flex-1" style={{ paddingTop: shouldDisplayHeaderFooter ? 0 : 0 }}>
                <MainRouter />
            </main>
            {shouldDisplayHeaderFooter && (userRole === "user" || userRole === "doctor") && !location.pathname.includes("chat") && <Footer />}
        </div>
    )
}

export default Layout;
