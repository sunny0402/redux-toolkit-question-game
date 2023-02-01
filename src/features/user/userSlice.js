import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../api";

// Note: Get data from backend and update Redux user & quetion slice ....
// this will be app data for all authed routes
export const handleGetUsers = createAsyncThunk(
  "users/appUsers",
  async (thunkAPI) => {
    try {
      const appUsers = await getUsers();
      console.log("appUsers: ", appUsers);

      // Note: API request successful, return of thunk in action.payload of handleGetUsers.fulfilled

      if (appUsers) {
        return appUsers;
      }
    } catch (e) {
      console.log("Error", e.response);
      thunkAPI.rejectWithValue(e.response);
    }
  }
);

const initialUserState = {
  userData: {},
  isFetchingUsers: false,
  isGetUsersSuccess: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialUserState,
  reducers: {
    clearUserState: (state) => {
      return initialUserState;
    },
  },
  //   Note: reducers based on return values of handleGetUsers thunk
  extraReducers: (builder) => {
    builder
      .addCase(handleGetUsers.fulfilled, (state, action) => {
        state.userData = { ...action.payload };
        state.isFetchingUsers = false;
        state.isGetUsersSuccess = true;
      })
      .addCase(handleGetUsers.pending, (state) => {
        state.isFetchingUsers = true;
      });
  },
});

export const { clearUserState } = userSlice.actions;

export default userSlice.reducer;
