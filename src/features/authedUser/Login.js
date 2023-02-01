import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearState } from "./authedUserSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const availableAppUsers = ["sarahedo", "tylermcginnis", "johndoe"];
  const [selectedUser, setSelectedUser] = useState("");
  const onUserChanged = (e) => setSelectedUser(e.target.value);

  // Note: from authedUserSlice get status of thunk which gets authed user info
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.authUser
  );

  // Note: loginUser will verify that selected user in api.getUsers()
  // if loginUser.fulfilled, isSuccess wil be set to true
  const handleLogin = () => {
    dispatch(loginUser(selectedUser));
  };

  // Note: on mount check if token exists to simulate persist state ...
  // isSuccess will be set to true if
  useEffect(() => {
    let tokenUserId = localStorage.getItem("token");
    if (tokenUserId) {
      dispatch(loginUser(tokenUserId));
    }
    dispatch(clearState());
  }, []);

  // Note: isSuccess, isError from authedUserSlice
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
    <Fragment>
      <div className="login-container">
        <div className="login-form-container">
          <form className="login-form">
            {isFetching && (
              <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
            {/* TODO: isError... */}
            <div className="login-heading">
              <h2>Login</h2>
            </div>
            <label htmlFor="username-label">Select User</label>
            <select value={selectedUser} onChange={onUserChanged}>
              <option value="">Select a user</option>
              {availableAppUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
