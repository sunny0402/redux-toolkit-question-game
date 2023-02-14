import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useParams,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import QuestioResult from "./QuestionResult";
import AnswerQuestion from "./AnswerQuestion";

const QuestionDetails = () => {
  const params = useParams();
  const { questionId } = params;

  const location = useLocation();
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isValidQuestion, setIsValidQuestion] = useState(false);

  // Note: questionData: key: id & value: id,author, timestamp, optionOne,optionTwo
  const { questionData } = useSelector((state) => state.questions);

  // Note: authedUser:  authedId, authedAvatar, authedName
  const authedUser = useSelector((state) => state.authUser);

  const { userData } = useSelector((state) => state.users);

  // Note: determine if question exists and whether it is answered or not
  useEffect(() => {
    if (questionId in questionData) {
      const answeredQuestions = userData[authedUser.authedId].answers;
      setIsValidQuestion(true);
      if (questionId in answeredQuestions) {
        setIsAnswered(true);
      } else {
        setIsAnswered(false);
      }
    } else {
      // Note: question does not exist, invalid path
      setIsError(true);
    }
  }, []);

  // Note: Error means invalid  question, log user out.
  useEffect(() => {
    if (isError) {
      navigate("/404", { replace: true, state: {} });
    }
  }, [isError]);

  return isValidQuestion && isAnswered ? (
    <QuestioResult questionId={questionId} />
  ) : (
    isValidQuestion && <AnswerQuestion questionId={questionId} />
  );
};

export default QuestionDetails;
