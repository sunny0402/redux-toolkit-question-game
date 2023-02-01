import React from "react";
import { Navigate, Route, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// When login set authedUser in Redux store and set token in local storage
// export const AuthorizedRoute = ({ component: Component, rest }) => {
export const AuthorizedRoute = () => {
  const location = useLocation();
  let currentAuthedUser = useSelector((state) => state.authUser);
  let authToken = localStorage.getItem("token");

  console.log("currentAuthedUser.authedId: ", currentAuthedUser.authedId);
  console.log("authToken: ", authToken);

  if (currentAuthedUser.authedId === authToken) {
    // Note: React Router v6: <Route path="/dashboard" element={<Dashboard authed={true} />} />
    // return <Route element={<Component {...rest} />} />;
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
