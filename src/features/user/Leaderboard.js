import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circles } from "react-loader-spinner";

import { userScores } from "../../helpers/sortData";

const Leaderboard = () => {
  // Note: get all user info from Redux store
  const { userData } = useSelector((state) => state.users);

  // Note: returns [{id,answerCount, askCount, score}, ...]
  const leaderBoardArr = userScores(userData);

  // Note: userData: id, name, avatarURL
  // and leaderBoardArr: id,answerCount, askCount, score

  const renderLeaderBoard = leaderBoardArr.map((leaderInfo) => (
    <article className="leaderboard-card fadeIn" key={leaderInfo.id}>
      <h3>Name:&nbsp;&nbsp;{userData[leaderInfo.id].name}</h3>
      <div className="avatar-container">
        <img src={userData[leaderInfo.id].avatarURL} alt="user avatar" />
      </div>
      <h4 className="answer-count">
        Questions Answered:&nbsp;&nbsp;{leaderInfo.answerCount}
      </h4>
      <h4 className="ask-count">Questions Asked:{leaderInfo.askCount}</h4>
      <h4 className="score-count">Score:&nbsp;&nbsp;{leaderInfo.score}</h4>
    </article>
  ));

  return (
    <section className="leaderboard-container">
      {renderLeaderBoard && <Fragment>{renderLeaderBoard}</Fragment>}
    </section>
  );
};

export default Leaderboard;
