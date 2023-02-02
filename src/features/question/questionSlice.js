import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestions, saveQuestion } from "../../api";

// Note: Get data from backend,_DATA.js, and update Redux  quetion slice
// Note: API request successful, return of thunk in action.payload of handleGetQuestion.fulfilled
export const handleGetQuestions = createAsyncThunk(
  "questions/appQuestions",
  async (thunkAPI) => {
    try {
      const appQuestions = await getQuestions();
      console.log("appQuestions: ", appQuestions);

      if (appQuestions) {
        return appQuestions;
      }
    } catch (e) {
      console.log("Error", e);
      thunkAPI.rejectWithValue("API request to get questions failed.");
    }
  }
);

// Note: dispatched on NeqQuestion form submission: optionOneText, optionTwoText, author
// savedNewQuestion returned by api.saveQuestion
export const handleSaveQuestion = createAsyncThunk(
  "questions/saveQuestion",
  async ({ optionOneText, optionTwoText, author }, thunkAPI) => {
    try {
      const newQuestion = { optionOneText, optionTwoText, author };
      console.log("newQuestion: ", newQuestion);

      const savedNewQuestion = await saveQuestion(newQuestion);
      console.log("savedNewQuestion: ", savedNewQuestion);

      // Note: savedNewQuestion added to Redux store in handleSaveQuestion.fulfilled
      if (savedNewQuestion) {
        return savedNewQuestion;
      }
    } catch (e) {
      console.log("Error", e);
      thunkAPI.rejectWithValue("API request to save questions failed.");
    }
  }
);

const initialQuestionState = {
  questionData: {},
  isFetchingQuestions: false,
  isGetQuestionsSuccess: false,
  isSaveQuestionSuccess: false,
  isSavingQuestion: false,
  isQuestionError: false,
  isErrorMessage: "",
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
      // Note: api.getQuestions()
      .addCase(handleGetQuestions.fulfilled, (state, action) => {
        state.questionData = { ...action.payload };
        state.isFetchingQuestions = false;
        state.isGetQuestionsSuccess = true;
      })
      .addCase(handleGetQuestions.pending, (state) => {
        state.isFetchingQuestions = true;
      })
      .addCase(handleGetQuestions.rejected, (state, action) => {
        state.isQuestionError = true;
        state.isErrorMessage = action.payload;
      })
      // Note: api.saveQuestion(question)
      .addCase(handleSaveQuestion.fulfilled, (state, action) => {
        state.questionData = {
          ...state.questionData,
          [action.payload.id]: action.payload,
        };
        state.isSavingQuestion = false;
        state.isSaveQuestionSuccess = true;
      })
      .addCase(handleSaveQuestion.pending, (state) => {
        state.isSavingQuestion = true;
        state.isSaveQuestionSuccess = false;
      })
      .addCase(handleSaveQuestion.rejected, (state, action) => {
        state.isQuestionError = true;
        state.isErrorMessage = action.payload;
      });
  },
});

export const { clearQuestionState } = questionSlice.actions;

export default questionSlice.reducer;
