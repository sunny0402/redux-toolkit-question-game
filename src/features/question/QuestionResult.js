import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tabulateVotes, formatTime } from "../../helpers/sortData";
import PercentageBar from "../../PercentageBar";

const QuestioResult = (props) => {
  const { questionId } = props;

  console.log(">>>DEBUG QuestionResult: questionId: ", questionId);

  // TODO highlight which option the authed user voted for as in Dashboard
  const currentAuthedUser = useSelector((state) => state.authUser);
  //   <div
  //   className={
  //     question.optionOne.votes.includes(currentAuthedUser.authedId)
  //       ? "highlight-optionOne-container"
  //       : "option-container"
  //   }
  // >
  //   <p className="question-option">
  //     Option One:&nbsp;&nbsp;{question.optionOne.text}
  //   </p>
  //   <p className="question-option">
  //     Option One Votes:{question.optionOne.votes.join(", ")}
  //   </p>
  // </div>

  const { questionData } = useSelector((state) => state.questions);

  const theQuestion = questionData[questionId];

  const { option1Percentage, option2Percentage, option1Count, option2Count } =
    tabulateVotes(theQuestion);

  const theTimestamp = formatTime(theQuestion.timestamp);

  return (
    <section className="single-question-container">
      {theQuestion && (
        <article className="question-article-container" key={theQuestion.id}>
          <h3>Question Author:&nbsp;&nbsp;{theQuestion.author}</h3>
          <h4>Question Id:&nbsp;&nbsp;{theQuestion.id}</h4>
          <h4>Date Asked:&nbsp;&nbsp;{theTimestamp}</h4>

          <div
            className={
              theQuestion.optionOne.votes.includes(currentAuthedUser.authedId)
                ? "highlight-optionOne-container"
                : "option-container"
            }
          >
            <p className="question-option">
              Option One:&nbsp;&nbsp;{theQuestion.optionOne.text}
            </p>
            <PercentageBar percentage={option1Percentage} />
            <p className="question-option">{option1Count}</p>
          </div>

          <div
            className={
              theQuestion.optionTwo.votes.includes(currentAuthedUser.authedId)
                ? "highlight-optionTwo-container"
                : "option-container"
            }
          >
            <p className="question-option">
              Option Two:&nbsp;&nbsp;{theQuestion.optionTwo.text}
            </p>
            <PercentageBar percentage={option2Percentage} />
            <p className="question-option">{option2Count}</p>
          </div>
        </article>
      )}
    </section>
  );
};

export default QuestioResult;
