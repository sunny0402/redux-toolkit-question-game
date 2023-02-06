import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circles } from "react-loader-spinner";

import { userScores } from "../../helpers/sortData";

const Leaderboard = () => {
  // Note: get all user info from Redux store
  const { userData } = useSelector((state) => state.users);

  // Note: returns [{id,answerCount, askCount, score}, ...]
  const leaderBoardArr = userScores(userData);
  console.log("leaderBoardArr: ", leaderBoardArr);

  // Note: userData: id, name, avatarURL
  // and leaderBoardArr: id,answerCount, askCount, score

  const renderLeaderBoard = leaderBoardArr.map((leaderInfo) => (
    <article className="question-article-container" key={leaderInfo.id}>
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
    <div className="dasboard-container">
      {renderLeaderBoard ? (
        <section className="question-container">{renderLeaderBoard}</section>
      ) : (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
    </div>
  );
};

export default Leaderboard;
