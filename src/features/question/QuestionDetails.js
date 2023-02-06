import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import QuestioResult from "./QuestionResult";
import AnswerQuestion from "./AnswerQuestion";

const QuestionDetails = () => {
  const params = useParams();
  const { questionId } = params;

  console.log(">>>DEBUG questionId: ", questionId);

  const [isError, setIsError] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  console.log(">>>DEBUG isAnswered: ", isAnswered);

  // Note: object where key: id & value: id,author, timestamp, optionOne,optionTwo
  const { questionData } = useSelector((state) => state.questions);

  // Note: authedUser:  authedId, authedAvatar, authedName
  const authedUser = useSelector((state) => state.authUser);

  const { userData } = useSelector((state) => state.users);

  // Note: if question exists, determined whether it is answered or not
  useEffect(() => {
    if (questionId in questionData) {
      const answeredQuestions = userData[authedUser.authedId].answers;
      if (questionId in answeredQuestions) {
        setIsAnswered(true);
      } else {
        setIsAnswered(false);
      }
    } else {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      <Navigate to="/404" replace />;
    }
  }, [isError]);

  return isAnswered ? (
    <QuestioResult questionId={questionId} />
  ) : (
    <AnswerQuestion questionId={questionId} />
  );
};

export default QuestionDetails;
