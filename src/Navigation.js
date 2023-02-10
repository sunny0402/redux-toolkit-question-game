import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Navigation = () => {
  const currentAuthedUser = useSelector((state) => state.authUser);
  //   TODO authToken should be const
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navigation">
      <div className="navigation-links-container">
        <Link to="/">
          <h2 className="home-link">Would You Rather?</h2>
        </Link>
        <Link to="/add" className="link-btn">
          New Question
        </Link>
        <Link to="/leaderboard" className="link-btn">
          Leaderboard
        </Link>
      </div>

      <div className="authed-header-container">
        <p>{currentAuthedUser.authedName}</p>
        <img src={currentAuthedUser.authedAvatar} alt="user avatar" />
        <button onClick={onLogOut} type="button">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navigation;
