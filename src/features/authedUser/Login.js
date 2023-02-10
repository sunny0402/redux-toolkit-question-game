import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser, clearState } from "./authedUserSlice";
import { handleGetUsers } from "../user/userSlice";
import { getLoginProfiles } from "../../helpers/sortData";

import { Circles } from "react-loader-spinner";

// TODO header for Login page with no navigation
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const availableAppUsers = ["sarahedo", "tylermcginnis", "johndoe"];
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
  // that way can get available users and avatars, will only get question data in dashboard
  useEffect(() => {
    try {
      dispatch(handleGetUsers());
    } catch (error) {
      console.log(error);
    }
  }, []);

  const availableAppUsers = getLoginProfiles(userData);

  // Note: loginUser will verify that selected user in api.getUsers()
  // if loginUser.fulfilled, isSuccess wil be set to true
  const handleLogin = () => {
    dispatch(loginUser(selectedUser));
  };

  // Note: When component mounts check if token exists in local storage
  // This siumlates a cookie, persistent login.
  // isSuccess will be set to true if login successful and user redirected to "/"
  useEffect(() => {
    dispatch(clearState());
    const tokenUserId = localStorage.getItem("token");
    if (tokenUserId) {
      dispatch(loginUser(tokenUserId));
    }
    // Test
    // dispatch(clearState());
  }, []);

  // Note: isSuccess, isError from authedUserSlice
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    // TODO test error
    if (isError) {
      console.log(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
    <Fragment>
      {/* TODO remove ... */}
      {/* {(isFetching || isFetchingUsers) && ( */}
      {/* {isFetchingUsers && (
        <div className="login-container">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )} */}

      {isGetUsersSuccess && availableAppUsers ? (
        <div className="login-container">
          <div className="login-heading">
            <h2>Login</h2>
          </div>
          <form className="login-form">
            <label htmlFor="username-label">Select User</label>
            <select value={selectedUser} onChange={onUserChanged}>
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
        <div className="login-container"></div>
      )}
    </Fragment>
  );
};
export default Login;
