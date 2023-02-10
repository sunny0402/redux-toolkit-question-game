import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tabulateVotes, formatTime } from "../../helpers/sortData";
import PercentageBar from "../../PercentageBar";

const QuestioResult = (props) => {
  const { questionId } = props;

  const currentAuthedUser = useSelector((state) => state.authUser);

  const { questionData } = useSelector((state) => state.questions);

  const theQuestion = questionData[questionId];

  const { option1Percentage, option2Percentage, option1Count, option2Count } =
    tabulateVotes(theQuestion);

  const theTimestamp = formatTime(theQuestion.timestamp);

  return (
    <section className="question-details-container">
      {theQuestion && (
        <article className="question-details-card" key={theQuestion.id}>
          <h3>Question Author:&nbsp;&nbsp;{theQuestion.author}</h3>
          <h4>Date Asked:&nbsp;&nbsp;{theTimestamp}</h4>

          <div
            className={
              theQuestion.optionOne.votes.includes(currentAuthedUser.authedId)
                ? "highlight-optionOne-container"
                : "option-container"
            }
          >
            <p className="question-option-text">
              {theQuestion.optionOne.votes.includes(
                currentAuthedUser.authedId
              ) ? (
                <span>&#10004;&nbsp;&nbsp;&nbsp;</span>
              ) : (
                ""
              )}
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
            <p className="question-option-text">
              {theQuestion.optionTwo.votes.includes(
                currentAuthedUser.authedId
              ) ? (
                <span>&#10004;&nbsp;&nbsp;&nbsp;</span>
              ) : (
                ""
              )}
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
