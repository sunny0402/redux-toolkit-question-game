import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestions, saveQuestion, saveQuestionAnswer } from "../../api";

// Note: Get data from backend,_DATA.js, and update Redux  quetion slice
// API request successful, return of thunk in action.payload of handleGetQuestion.fulfilled
export const handleGetQuestions = createAsyncThunk(
  "questions/appQuestions",
  async (thunkAPI) => {
    try {
      const appQuestions = await getQuestions();

      if (appQuestions) {
        return appQuestions;
      }
    } catch (e) {
      console.log("Error", e);
      thunkAPI.rejectWithValue("API request to get questions failed.");
    }
  }
);

// Note: dispatched on NeWQuestion form submission: optionOneText, optionTwoText, author
// savedNewQuestion returned by api.saveQuestion()
// handleSaveQuestion only updates _DATA.js and question slice, not user slice
// so to get latest data from users, like a users answered questions, need to run handleGetUsers
export const handleSaveQuestion = createAsyncThunk(
  "questions/saveQuestion",
  async ({ optionOneText, optionTwoText, author }, thunkAPI) => {
    try {
      const newQuestion = { optionOneText, optionTwoText, author };

      const savedNewQuestion = await saveQuestion(newQuestion);

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

// Note: api.saveQuestionAnswer({ authedUser, qid, answer }) has no return value
// handleAnswerQuestion only updates _DATA.js, need to run handleGetQuestions, HandleGetUsers
// to save this answer to Redux store, accomplish this with useEffect in UI component
export const handleAnswerQuestion = createAsyncThunk(
  "questions/answerQuestion",
  async ({ authedUser, qid, answer }, thunkAPI) => {
    try {
      const newAnswer = { authedUser, qid, answer };

      await saveQuestionAnswer(newAnswer);

      return newAnswer;
    } catch (e) {
      console.log("Error", e);
      thunkAPI.rejectWithValue("API request to save question answer failed.");
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
  isNewAnsweSaved: false,
  isSavingNewAnswer: false,
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
      // update Redux store immediately after updating _DATA.js with handeSaveQuestion
      .addCase(handleSaveQuestion.fulfilled, (state, action) => {
        const formattedQuestion = { ...action.payload };

        state.questionData = {
          ...state.questionData,
          [formattedQuestion.id]: formattedQuestion,
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
      })

      // Note: api.saveQuestionAnswer({ authedUser, qid, answer })
      .addCase(handleAnswerQuestion.fulfilled, (state, action) => {
        const { authedUser, qid, answer } = action.payload;
        state.questionData = {
          ...state.questionData,
          [qid]: {
            ...state.questionData[qid],
            [answer]: {
              ...state.questionData[qid][answer],
              votes: state.questionData[qid][answer].votes.concat([authedUser]),
            },
          },
        };
        state.isNewAnsweSaved = true;
        state.isSavingNewAnswer = false;
      })

      .addCase(handleAnswerQuestion.pending, (state) => {
        state.isSavingNewAnswer = true;
      })
      .addCase(handleAnswerQuestion.rejected, (state, action) => {
        state.isQuestionError = true;
        state.isErrorMessage = action.payload;
      });
  },
});

export const { clearQuestionState } = questionSlice.actions;

export default questionSlice.reducer;
