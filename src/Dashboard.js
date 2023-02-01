import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circles } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";

//Note: thunks for fetching question and user data and reducer to clear state
import { handleGetUsers } from "./features/user/userSlice";
import { handleGetQuestions } from "./features/question/questionSlice";

// Note: helpers to sort and format quetsions
import {
  sortQuestions,
  sortByTimestamps,
  formatDates,
} from "./helpers/sortData";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Note: authedUser info set as part of login
  const currentAuthedUser = useSelector((state) => state.authUser);

  // Note: from userSlice get status of thunk to get users
  const { userData, isFetchingUsers, isGetUsersSuccess } = useSelector(
    (state) => state.users
  );
  const { questionData, isFetchingQuestions, isGetQuestionsSuccess } =
    useSelector((state) => state.questions);

  // Note: component state
  const [isError, setIsError] = useState(false);
  const [showAnswered, setShowAnswered] = useState(false);
  const [answered, setAnswered] = useState([]);

  const [showNotAnswered, setShowNotAnswered] = useState(false);
  const [notAnswered, setNotAnswered] = useState([]);

  // Note: populate Redux store with user and question data
  useEffect(() => {
    try {
      if (!isFetchingUsers && !isGetUsersSuccess) {
        dispatch(handleGetUsers());
      }
      if (!isFetchingQuestions && !isGetQuestionsSuccess) {
        // Note: Get question data
        dispatch(handleGetQuestions());
      }
    } catch (error) {
      setIsError(true);
    }
  }, []);

  // Note: sort and format questions for render
  // Update component state: setAnswered(formattedAnswered) & setNotAnswered(formattedNotAnswered);
  //
  useEffect(() => {
    try {
      if (questionData && currentAuthedUser && userData) {
        //1. Get array of answered and not answered
        const { answered, notAnswered } = sortQuestions(
          currentAuthedUser.authedId,
          questionData,
          userData
        );

        //2. Sort by timestamps
        const sortedAnswered = sortByTimestamps(answered);
        const sortedUnanswered = sortByTimestamps(notAnswered);

        //3. Format timestamps .. add formattedTimestamp attribute
        const formattedAnswered = formatDates(sortedAnswered);
        const formattedNotAnswered = formatDates(sortedUnanswered);

        setAnswered(formattedAnswered);
        setNotAnswered(formattedNotAnswered);

        if (!formattedAnswered || !formattedNotAnswered) {
          throw new Error("Could not prepare question for rendering.");
        }
      } else {
        throw new Error("Question data not available.");
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  }, [isGetQuestionsSuccess]); //Note: run effect once get data

  // Note: if error getting data navigate to login
  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  console.log("answered: ", answered);

  const renderAnswered = answered.map((question) => (
    <article className="question-article-container" key={question.id}>
      <h3>Question Author:&nbsp;&nbsp;{question.author}</h3>
      <h4>Question Id::&nbsp;&nbsp;{question.id}</h4>
      <h4>Question Time::&nbsp;&nbsp;{question.formattedTimestamp}</h4>
      <p className="question-option">
        Option One:&nbsp;&nbsp;{question.optionOne.text}
      </p>
      <p className="question-option">
        Option One Votes:{question.optionOne.votes.join(", ")}
      </p>
      <p className="question-option">
        Option Two:&nbsp;&nbsp;{question.optionTwo.text}
      </p>
      <p className="question-option">
        Option Two Votes:&nbsp;&nbsp;{question.optionTwo.votes.join(", ")}
      </p>
      {/* TODO create detail view page */}
      {/* <Link to={`/questions/${question.id}`} className="link-btn">
        View Question Details
      </Link> */}
    </article>
  ));

  const renderNotAnswered = notAnswered.map((question) => (
    <article className="question-article-container" key={question.id}>
      <h3>Question Author:&nbsp;&nbsp;{question.author}</h3>
      <h4>Question Id::&nbsp;&nbsp;{question.id}</h4>
      <h4>Question Time::&nbsp;&nbsp;{question.formattedTimestamp}</h4>
      <p className="question-option">
        Option One:&nbsp;&nbsp;{question.optionOne.text}
      </p>
      <p className="question-option">
        Option One Votes:{question.optionOne.votes.join(", ")}
      </p>
      <p className="question-option">
        Option Two:&nbsp;&nbsp;{question.optionTwo.text}
      </p>
      <p className="question-option">
        Option Two Votes:&nbsp;&nbsp;{question.optionTwo.votes.join(", ")}
      </p>
      {/* TODO create detail view page */}
      {/* <Link to={`/questions/${question.id}`} className="link-btn">
        View Question Details
      </Link> */}
    </article>
  ));

  console.log("renderAnswered: ", renderAnswered);

  return (
    <div className="dasboard-container">
      {isFetchingUsers || isFetchingQuestions ? (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : currentAuthedUser && answered && notAnswered ? (
        <Fragment>
          <div className="dasboard-auth-heading">
            Welcome back <h3>{currentAuthedUser.authedName}</h3>
            <div className="avatar-container">
              <img src={currentAuthedUser.authedAvatar} alt="user avatar" />
            </div>
          </div>
          <button onClick={onLogOut} type="button">
            Log Out
          </button>
          <button onClick={() => setShowAnswered(true)}>Answered</button>
          <button onClick={() => setShowNotAnswered(true)}>Not Answered</button>
          <section className="question-container">
            {showAnswered ? renderAnswered : renderNotAnswered}
          </section>
        </Fragment>
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

export default Dashboard;
