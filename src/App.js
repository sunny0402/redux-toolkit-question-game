import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import Login from "./features/authedUser/Login";
import Dashboard from "./Dashboard";
import AuthorizedRoute from "./AuthorizedRoute";
import LeaderBoard from "./features/user/Leaderboard";

import Navigation from "./Navigation";

import NewQuestion from "./features/question/NewQuestion";
import QuestionDetails from "./features/question/QuestionDetails";
import NotFound from "./NotFound";
import "./App.css";

function App() {
  const currentAuthedUser = useSelector((state) => state.authUser);
  const authToken = localStorage.getItem("token");
  let authed = false;
  if (currentAuthedUser.authedId === authToken) {
    authed = true;
  }
  return (
    <BrowserRouter>
      <div className="app-container">
        {authed && <Navigation />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthorizedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<NewQuestion />} />
            <Route
              path="/questions/:questionId"
              element={<QuestionDetails />}
            />
            <Route path="/leaderboard" element={<LeaderBoard />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>

        <div className="app-footer">
          <footer>
            <a
              href="https://github.com/sunny0402"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
