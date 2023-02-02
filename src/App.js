import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// authentication components
import Login from "./features/authedUser/Login";
import Dashboard from "./Dashboard";
import { AuthorizedRoute } from "./AuthorizedRoute";
import "./App.css";
import { NewQuestion } from "./features/question/NewQuestion";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="navigation">
          <Link to="/" className="link-btn">
            Dashboard
          </Link>
          <h2>Would You Rather?</h2>
          <Link to="/add" className="link-btn">
            Ask a Question
          </Link>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthorizedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<NewQuestion />} />
          </Route>
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
