import React from "react";
import { Navigate, Route, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthorizedRoute = () => {
  const location = useLocation();
  let currentAuthedUser = useSelector((state) => state.authUser);
  let authToken = localStorage.getItem("token");

  if (currentAuthedUser.authedId === authToken) {
    // Note: React Router v6: <Route path="/dashboard" element={<Dashboard authed={true} />} />
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default AuthorizedRoute;
