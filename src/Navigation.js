import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Navigation = () => {
  const currentAuthedUser = useSelector((state) => state.authUser);
  //   TODO authToken should be const
  //   if (currentAuthedUser.authedId === authToken) {
  //   const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navigation">
      <Link to="/" className="link-btn">
        Dashboard
      </Link>
      <h2>Would You Rather?</h2>
      <Link to="/add" className="link-btn">
        New Question
      </Link>
      <Link to="/leaderboard" className="link-btn">
        Leaderboard
      </Link>

      <div className="dasboard-auth-heading">
        Welcome:&nbsp;&nbsp; <h3>{currentAuthedUser.authedName}</h3>
        <div className="avatar-container">
          <img src={currentAuthedUser.authedAvatar} alt="user avatar" />
        </div>
      </div>
      <button onClick={onLogOut} type="button">
        Log Out
      </button>
    </div>
  );
};

export default Navigation;
