import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestions } from "../../api";

// Note: Get data from backend,_DATA.js, and update Redux  quetion slice
export const handleGetQuestions = createAsyncThunk(
  "questions/appQuestions",
  async (thunkAPI) => {
    try {
      const appQuestions = await getQuestions();
      console.log("appQuestions: ", appQuestions);

      // Note: API request successful, return of thunk in action.payload of handleGetQuestion.fulfilled

      if (appQuestions) {
        return appQuestions;
      }
    } catch (e) {
      console.log("Error", e.response);
      thunkAPI.rejectWithValue(e.response);
    }
  }
);

const initialQuestionState = {
  questionData: {},
  isFetchingQuestions: false,
  isGetQuestionsSuccess: false,
};

export const questionSlice = createSlice({
  name: "questions",
  initialState: initialQuestionState,
  reducers: {
    clearQuestionState: (state) => {
      return initialQuestionState;
    },
  },

  //   Note: reducers based on return values of handleGetQuestions thunk
  extraReducers: (builder) => {
    builder
      .addCase(handleGetQuestions.fulfilled, (state, action) => {
        state.questionData = { ...action.payload };
        state.isFetchingQuestions = false;
        state.isGetQuestionsSuccess = true;
      })
      .addCase(handleGetQuestions.pending, (state) => {
        state.isFetchingQuestions = true;
      });
  },
});

export const { clearQuestionState } = questionSlice.actions;

export default questionSlice.reducer;
