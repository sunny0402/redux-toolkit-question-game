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

  // Note: from userSlice get user infp and status of thunk to get users
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
  // TODO: userData should already be poulated in <Login />
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

  const renderAnswered = answered.map((question) => (
    <article className="question-article-container" key={question.id}>
      <div className="avatar-container">
        <img src={userData[question.author].avatarURL} alt="user avatar" />
      </div>
      <h3>
        {userData[question.author].name}&nbsp;&nbsp; asks would you rather?
      </h3>
      <div
        className={
          question.optionOne.votes.includes(currentAuthedUser.authedId)
            ? "highlight-optionOne-container"
            : "option-container"
        }
      >
        <p className="question-option">
          Option One:&nbsp;&nbsp;{question.optionOne.text}
        </p>
        <p className="question-option">
          Option One Votes:{question.optionOne.votes.join(", ")}
        </p>
      </div>

      <div
        className={
          question.optionTwo.votes.includes(currentAuthedUser.authedId)
            ? "highlight-optionTwo-container"
            : "option-container"
        }
      >
        <p className="question-option">
          Option Two:&nbsp;&nbsp;{question.optionTwo.text}
        </p>
        <p className="question-option">
          Option Two Votes:&nbsp;&nbsp;{question.optionTwo.votes.join(", ")}
        </p>
      </div>
      <p>Date asked:&nbsp;&nbsp;{question.formattedTimestamp}</p>
      <Link to={`/questions/${question.id}`} className="link-btn">
        <button>View Question Details</button>
      </Link>
    </article>
  ));

  const renderNotAnswered = notAnswered.map((question) => (
    <article className="question-article-container" key={question.id}>
      <div className="avatar-container">
        <img src={userData[question.author].avatarURL} alt="user avatar" />
      </div>
      <h3>
        {userData[question.author].name}&nbsp;&nbsp; asks would you rather?
      </h3>
      <p className="question-option">
        Option One:&nbsp;&nbsp;{question.optionOne.text}
      </p>
      <p className="question-option">
        Option Two:&nbsp;&nbsp;{question.optionTwo.text}
      </p>
      <p>Date asked:&nbsp;&nbsp;{question.formattedTimestamp}</p>
      <Link
        to={`/questions/${question.id}`}
        // state={{ answered: false }}
        className="link-btn"
      >
        <button>Answer Question</button>
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
