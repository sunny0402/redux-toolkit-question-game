import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, getQuestions } from "../../api";

// Note: form submission only gives send auth_id to the reducer
export const loginUser = createAsyncThunk(
  "authUser/login",
  async (auth_id, thunkAPI) => {
    try {
      console.log("auth_id: ", auth_id);
      const response = await getUsers();
      console.log("response", response);

      if (response) {
        const authUserId = Object.keys(response).find(
          (userObj) => userObj === auth_id
        );

        const authUserName = response[authUserId].name;
        const authUserAvatar = response[authUserId].avatarURL;

        // Note: set the token as the authedUser to persist login
        localStorage.setItem("token", authUserId);

        // Note use returned values to update authUser slice
        console.log({ authUserId, authUserName, authUserAvatar });
        return { authUserId, authUserName, authUserAvatar };
      }
    } catch (e) {
      console.log("Error", e.response);
      thunkAPI.rejectWithValue(e.response);
    }
  }
);

const initialAuthState = {
  authedId: "",
  authedAvatar: "",
  authedName: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const authedUserSlice = createSlice({
  name: "authUser",
  initialState: initialAuthState,
  reducers: {
    clearState: (state) => {
      return initialAuthState;
    },
  },
  // Note: updating state with returned values of loginUser thunk
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        // Note: authUserId, authUserName, authUserAvatar returned by thunk loginUser
        state.authedId = action.payload.authUserId;
        state.authedAvatar = action.payload.authUserAvatar;
        state.authedName = action.payload.authUserName;
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState } = authedUserSlice.actions;

export default authedUserSlice.reducer;
