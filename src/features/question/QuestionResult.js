import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circles } from "react-loader-spinner";
import { tabulateVotes, formatTime } from "../../helpers/sortData";

const QuestioResult = (props) => {
  const { questionId } = props;
  console.log(">>>DEBUG QuestionResult: questionId: ", questionId);

  // TODO pass a prop of which option voted for ... or getUsers and find authed user

  const { questionData } = useSelector((state) => state.questions);

  const theQuestion = questionData[questionId];

  const { option1Votes, option2Votes } = tabulateVotes(theQuestion);

  const theTimestamp = formatTime(theQuestion.timestamp);

  return (
    <section className="single-question-container">
      {theQuestion && (
        <article className="question-article-container" key={theQuestion.id}>
          <h3>Question Author:&nbsp;&nbsp;{theQuestion.author}</h3>
          <h4>Question Id::&nbsp;&nbsp;{theQuestion.id}</h4>
          <h4>Question Time:&nbsp;&nbsp;{theTimestamp}</h4>
          <p className="question-option">
            Option One:&nbsp;&nbsp;{theQuestion.optionOne.text}
          </p>
          {/* TODO create a  percentage bar component*/}
          <p className="question-option">
            Option One Votes:&nbsp;&nbsp;{option1Votes}
          </p>
          <p className="question-option">
            Option Two:&nbsp;&nbsp;{theQuestion.optionTwo.text}
          </p>
          <p className="question-option">
            Option Two Votes:&nbsp;&nbsp;{option2Votes}
          </p>
        </article>
      )}
    </section>
  );
};

export default QuestioResult;
