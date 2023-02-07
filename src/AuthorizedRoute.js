import React from "react";
import { Navigate, Route, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./Navigation";
// import Dashboard from "./Dashboard";
// import LeaderBoard from "./features/user/Leaderboard";
// import NewQuestion from "./features/question/NewQuestion";
// import QuestionDetails from "./features/question/QuestionDetails";

const AuthorizedRoute = () => {
  const location = useLocation();
  let currentAuthedUser = useSelector((state) => state.authUser);
  let authToken = localStorage.getItem("token");

  if (currentAuthedUser.authedId === authToken) {
    // Note: React Router v6: <Route path="/dashboard" element={<Dashboard authed={true} />} />
    return (
      // Test
      // <>
      //   <Navigation />
      //   <Route path="/home" element={<Dashboard />} />
      //   <Route path="/add" element={<NewQuestion />} />
      //   <Route path="/questions/:questionId" element={<QuestionDetails />} />
      //   <Route path="/leaderboard" element={<LeaderBoard />} />
      // </>
      <Outlet />
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default AuthorizedRoute;
