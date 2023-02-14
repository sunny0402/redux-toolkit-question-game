import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { loginUser, clearState } from "./authedUserSlice";
import { handleGetUsers } from "../user/userSlice";
import { getLoginProfiles } from "../../helpers/sortData";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Note: instead of hardcoding  availableAppUsers = ["sarahedo", "tylermcginnis", "johndoe"];
  const { userData, isFetchingUsers, isGetUsersSuccess } = useSelector(
    (state) => state.users
  );

  const [selectedUser, setSelectedUser] = useState("");
  const onUserChanged = (e) => setSelectedUser(e.target.value);

  // Note: from authedUserSlice get status of thunk which verifies and sets authed user info
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.authUser
  );

  // Note: populate Redux store with user data
  // that way can get available users and avatars, will get question data in dashboard
  useEffect(() => {
    try {
      dispatch(handleGetUsers());
    } catch (error) {
      console.log(error);
    }
  }, []);

  const availableAppUsers = getLoginProfiles(userData);

  // Note: loginUser will verify that selected user in api.getUsers() response
  // if loginUser.fulfilled, isSuccess wil be set to true in authUserSlice
  const handleLogin = () => {
    dispatch(loginUser(selectedUser));
  };

  // Note: When component mounts check if token exists in local storage
  // This siumlates persistent login as with a cookie
  // isSuccess will be set to true if login successful and user redirected to "/"
  useEffect(() => {
    // Note: clear authUser state
    dispatch(clearState());
    const tokenUserId = localStorage.getItem("token");
    if (tokenUserId) {
      dispatch(loginUser(tokenUserId));
    }
  }, []);

  // Note: isSuccess, isError from authedUserSlice
  useEffect(() => {
    if (isSuccess) {
      // Note: desiredPath exists if user redirected to /login after manually entering a URL
      const desiredPath = location.state?.path;

      if (desiredPath) {
        navigate(`${desiredPath}`, { state: { path: desiredPath } });
      } else {
        navigate("/");
      }
    }
    if (isError) {
      console.log(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
    <Fragment>
      {isGetUsersSuccess && availableAppUsers ? (
        <div className="login-container">
          <div className="login-heading">
            <h2>Login</h2>
          </div>
          <form className="login-form">
            <label htmlFor="username-label">Select User</label>
            <select
              className="user-select"
              value={selectedUser}
              onChange={onUserChanged}
            >
              <option value="">Select a user</option>
              {Object.entries(availableAppUsers).map(([username, user]) => (
                <option key={username} value={username}>
                  {user.name}
                </option>
              ))}
            </select>
            {selectedUser && (
              <div className="avatar-option-container">
                <br />
                <img
                  src={availableAppUsers[selectedUser].avatar}
                  alt="user avatar"
                />
                <br />
                <p>{availableAppUsers[selectedUser].name}</p>
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={!selectedUser}
                >
                  Login
                </button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="login-container">
          <div className="login-heading">
            <h2>Authenticating...</h2>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Login;
