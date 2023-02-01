import { configureStore } from "@reduxjs/toolkit";
import authedUserReducer from "../features/authedUser/authedUserSlice";
import questionsReducer from "../features/question/questionSlice";
import usersReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    authUser: authedUserReducer,
    users: usersReducer,
    questions: questionsReducer,
  },
});
