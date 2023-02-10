import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuestionResults from "./QuestionResult";

// Note: handleGetQuestions, handleGetUsers will update Redux store with latest data from _DATA.js
import { handleAnswerQuestion } from "./questionSlice";

const AnswerQuestion = (props) => {
  // Note: questionId passed from QuestionDetails.js
  const { questionId } = props;

  // Note: question object:id, author, timestamp, optionOne.votes/text, optionTwo.votes/text
  const { questionData } = useSelector((state) => state.questions);
  const theQuestion = questionData[questionId];

  const theAuthedUser = useSelector((state) => state.authUser);

  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onAnswerQuestion = () => {
    if (selectedOption) {
      dispatch(
        //Note: handleAnswerQuestion expects { authedUser, qid, answer }
        handleAnswerQuestion({
          authedUser: theAuthedUser.authedId,
          qid: theQuestion.id,
          answer: selectedOption,
        })
      );
      setSubmitted(true);
      // Note: redirect to <QuestionDetails /> which displays results if question answered
      // already at this route ... navigate(`/questions/${questionId}`);
    }
  };

  return submitted ? (
    <QuestionResults questionId={questionId} />
  ) : (
    <section>
      <form>
        <input
          type="radio"
          value="optionOne"
          checked={selectedOption === "optionOne"}
          onChange={handleOptionChange}
        />
        <label htmlFor="optionOne">{theQuestion.optionOne.text}</label>
        <br />
        <input
          type="radio"
          value="optionTwo"
          checked={selectedOption === "optionTwo"}
          onChange={handleOptionChange}
        />
        <label htmlFor="optionTwo">{theQuestion.optionTwo.text}</label>

        <button
          type="button"
          onClick={onAnswerQuestion}
          disabled={!selectedOption}
        >
          Vote
        </button>
      </form>
    </section>
  );
};

export default AnswerQuestion;
