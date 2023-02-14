import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthorizedRoute = () => {
  const location = useLocation();

  const currentAuthedUser = useSelector((state) => state.authUser);
  const authToken = localStorage.getItem("token");

  if (currentAuthedUser.authedId === authToken) {
    // Note: authed prop for authorized navigation header with links to protected routes
    // <Outlet /> renders authorized children routes
    return <Outlet authed={true} />;
  } else {
    //Note: location.pathname contains the path the user was trying to access, but not authenticated
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{ path: location.pathname }}
      />
    );
    // Note: with useNavigate hook
    // navigate("/login", {
    //   replace: true,
    //   state: { path: location.pathname },
    // });
  }
};

export default AuthorizedRoute;
