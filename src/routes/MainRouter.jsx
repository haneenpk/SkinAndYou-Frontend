import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import DoctorRoutes from "./DoctorRoutes";
import UserRoutes from "./UserRoutes";

const MainRouter = () => {

  const isLoading = useSelector(state => state.common.loading);
  const isDoctorLoggedIn = useSelector(state => state.doctor.isLoggedIn);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          path="/doctor/*"
          element={<DoctorRoutes isLoggedIn={isDoctorLoggedIn} />}
        />
        <Route
          path="/*"
          element={<UserRoutes />}
        />
      </Routes>
    </Suspense>
  );
};

export default MainRouter;