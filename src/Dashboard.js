import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circles } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";

//Note: thunks for fetching question and user data
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

  const {
    questionData,
    isFetchingQuestions,
    isGetQuestionsSuccess,
    isSaveQuestionSuccess,
  } = useSelector((state) => state.questions);

  // Note: component state
  const [isError, setIsError] = useState(false);

  const [showAnswered, setShowAnswered] = useState(false);
  const [answered, setAnswered] = useState([]);

  // Note; by default show not answered questions
  const [showNotAnswered, setShowNotAnswered] = useState(true);
  const [notAnswered, setNotAnswered] = useState([]);

  // Note: populate Redux store with user and question data
  useEffect(() => {
    try {
      dispatch(handleGetUsers());
      dispatch(handleGetQuestions());
    } catch (error) {
      setIsError(true);
    }
  }, []);

  // Note: sort and format questions for render
  // Update component state: setAnswered(formattedAnswered) & setNotAnswered(formattedNotAnswered);
  useEffect(() => {
    try {
      if (questionData && currentAuthedUser && userData) {
        //1. Get array of answered and not answered
        const { answeredArr, notAnsweredArr } = sortQuestions(
          currentAuthedUser.authedId,
          questionData,
          userData
        );

        //2. Sort by timestamps
        const sortedAnswered = sortByTimestamps(answeredArr);
        const sortedUnanswered = sortByTimestamps(notAnsweredArr);

        //3. Format timestamps .. add formattedTimestamp attribute
        const formattedAnswered = formatDates(sortedAnswered);
        const formattedNotAnswered = formatDates(sortedUnanswered);

        setAnswered(formattedAnswered);
        setNotAnswered(formattedNotAnswered);

        if (!formattedAnswered || !formattedNotAnswered) {
          throw new Error("Could not prepare question for rendering.");
        }
      } else {
        throw new Error("App data not available.");
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
    //Note: runs on first render
    // and re-runs if isSaveQuestionSuccess,isFetchingQuestions changes
  }, [isSaveQuestionSuccess, isFetchingQuestions]);

  // Note: if error getting data navigate to login
  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError]);

  // const onLogOut = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

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
      <Link
        to={`/questions/${question.id}`}
        // state={{ answered: true }}
        className="link-btn"
      >
        View Question Details
      </Link>
    </article>
  ));

  const renderNotAnswered = notAnswered.map((question) => (
    <article className="question-article-container" key={question.id}>
      <h3>Question Author:&nbsp;&nbsp;{question.author}</h3>
      <h4>Question Id:&nbsp;&nbsp;{question.id}</h4>
      <h4>Question Time:&nbsp;&nbsp;{question.formattedTimestamp}</h4>
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
      <Link
        to={`/questions/${question.id}`}
        // state={{ answered: false }}
        className="link-btn"
      >
        View Question Details
      </Link>
    </article>
  ));

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
      ) : currentAuthedUser && renderAnswered && renderNotAnswered ? (
        <Fragment>
          <button
            onClick={() => {
              setShowAnswered(true);
              setShowNotAnswered(false);
            }}
          >
            Answered
          </button>
          <button
            onClick={() => {
              setShowAnswered(false);
              setShowNotAnswered(true);
            }}
          >
            Not Answered
          </button>
          <section className="question-container">
            {showAnswered && (
              <Fragment>
                <h2>Already Answered:</h2>
                {renderAnswered}
              </Fragment>
            )}
            {showNotAnswered && (
              <Fragment>
                <h2>Not Answered:</h2>
                {renderNotAnswered}
              </Fragment>
            )}
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
