import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./features/authedUser/Login";
import Dashboard from "./Dashboard";
import AuthorizedRoute from "./AuthorizedRoute";
import LeaderBoard from "./features/user/Leaderboard";

import NewQuestion from "./features/question/NewQuestion";
import QuestionDetails from "./features/question/QuestionDetails";
import NotFound from "./NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* TODO display NAV only if authed ....*/}
        {/* TODO maybe display avatar and logout button here ....*/}
        <div className="navigation">
          <Link to="/" className="link-btn">
            Dashboard
          </Link>
          <h2>Would You Rather?</h2>
          <Link to="/add" className="link-btn">
            Ask a Question
          </Link>
          <Link to="/leaderboard" className="link-btn">
            Leaderboard
          </Link>
        </div>
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
          <Route path="/404" element={<NotFound />} />
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
