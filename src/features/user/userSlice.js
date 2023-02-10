import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../api";

import { handleAnswerQuestion } from "../question/questionSlice";

import { handleSaveQuestion } from "../question/questionSlice";

// Note: Get data from backend and update Redux user & quetion slice ....
// this will be app data for all authed routes
export const handleGetUsers = createAsyncThunk(
  "users/appUsers",
  async (thunkAPI) => {
    try {
      const appUsers = await getUsers();

      // Note: API request successful, return of thunk in action.payload of handleGetUsers.fulfilled

      if (appUsers) {
        return appUsers;
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response);
    }
  }
);

const initialUserState = {
  userData: {},
  isFetchingUsers: false,
  isGetUsersSuccess: false,
  isUpdatingUserAnswers: false,
  isUserAnswersUpdated: false,
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
      })
      // Note: also update users slice when creating a new question
      // specifically add the new question to question array
      .addCase(handleSaveQuestion.fulfilled, (state, action) => {
        const { author, id } = action.payload;
        // Test
        state.userData[author] = {
          ...state.userData[author],
          questions: state.userData[author].questions.concat([id]),
        };
        // state.userData[formattedQuestion.author] = {
        //   ...state.userData[formattedQuestion.author],
        //   questions: state.userData[formattedQuestion.author].questions.concat([
        //     formattedQuestion.id,
        //   ]),
        // };
      })
      // Note: not only udate questions slice but also users slice when a question is answered
      .addCase(handleAnswerQuestion.fulfilled, (state, action) => {
        const { authedUser, qid, answer } = action.payload;
        // Note: with Redux Toolkit can update the specific item in state
        state.userData[authedUser] = {
          ...state.userData[authedUser],
          answers: {
            ...state.userData[authedUser].answers,
            [qid]: answer,
          },
        };
        state.isUpdatingUserAnswers = false;
        state.isUserAnswersUpdated = true;
      })
      .addCase(handleAnswerQuestion.pending, (state) => {
        state.isUpdatingUserAnswers = true;
      });
  },
});

export const { clearUserState } = userSlice.actions;

export default userSlice.reducer;
