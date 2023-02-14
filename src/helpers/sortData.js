/**
 * For <Login /> get user id, name and avatar for login options
 *
 * @param {object} userData { id: {userInfo},id: {userInfo}, ...]
 * @returns {array} [id1: {id1,name1,avatar1}, id2:{id2,name2,avatar2}, ...]
 */
export const getLoginProfiles = (userData) => {
  const loginProfiles = {};
  for (let userId in userData) {
    loginProfiles[userId] = {};
    loginProfiles[userId]["name"] = userData[userId].name;
    loginProfiles[userId]["avatar"] = userData[userId].avatarURL;
  }
  return loginProfiles;
};

/**
 * For <Leaderboard /> this function returns an array of objects.
 * Each object contains {id, answerCount, askCount, score}
 *
 * @param {object} userData { id: {userInfo},id: {userInfo}, ...]
 * @returns {array} [{id,answerCount, askCount, score}, ...]
 */
export const userScores = (userData) => {
  const leaderBoardArr = [];
  for (let [userId, userObject] of Object.entries(userData)) {
    let answerCount = Object.keys(userData[userId].answers).length;
    let askCount = userData[userId].questions.length;
    let score = answerCount + askCount;

    leaderBoardArr.push({
      id: userId,
      answerCount: answerCount,
      askCount: askCount,
      score: score,
    });
  }
  return leaderBoardArr.sort((a, b) => b.score - a.score);
};

/**
 * For <Dashboard /> returns an array of answered
 * and notAnswered question ids for currently authed user
 *
 * @param {array} authId [{question1},{question2},...]
 * @param {object} questions [{question1},{question2},...]
 * @param {object} users [{question1},{question2},...]
 * @returns {object} { answeredArr, notAnsweredArr }
 */
export const sortQuestions = (authId, questions, users) => {
  const answeredArr = [];
  const notAnsweredArr = [];
  for (let qId in questions) {
    if (qId in users[authId].answers) {
      answeredArr.push(questions[qId]);
    } else {
      notAnsweredArr.push(questions[qId]);
    }
  }
  return { answeredArr, notAnsweredArr };
};

/**
 * For <Dashboard /> sort an array of question objects by timestamp
 *
 * @param {array} arrOfQuestions [{question1},{question2},...]
 * @returns {array} Most recent first.
 */
export const sortByTimestamps = (arrOfQuestions) => {
  return arrOfQuestions.sort((a, b) => b.timestamp - a.timestamp);
};

/**
 * modify timestamp attribute of question object in arrOfQuestions
 *
 * @param {array} arrOfQuestions [{question1},{question2},...]
 * @returns {array}  formattedQuestions
 */
export const formatDates = (arrOfQuestions) => {
  let formattedQuestions = [];
  for (let i = 0; i < arrOfQuestions.length; i++) {
    let timestamp = arrOfQuestions[i].timestamp;
    let d = new Date(timestamp);
    let time = d.toLocaleTimeString("en-US");
    let formattedTimestamp =
      time.slice(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
    formattedQuestions.push({ ...arrOfQuestions[i], formattedTimestamp });
  }
  return formattedQuestions;
};

/**
 * For <QuestionResult />
 *
 * @param {object} questionObject questionData[questionId]
 * @returns {object} {option1Votes: 7/10, option2Votes: 3/10}
 */
export const tabulateVotes = (questionObject) => {
  const totalVotes =
    questionObject.optionOne.votes.length +
    questionObject.optionTwo.votes.length;
  const option1Votes = questionObject.optionOne.votes.length / totalVotes;
  const option2Votes = questionObject.optionTwo.votes.length / totalVotes;

  const option1Percentage = Math.round(option1Votes * 100);
  const option2Percentage = Math.round(option2Votes * 100);

  const option1Count = `${questionObject.optionOne.votes.length} out of ${totalVotes}`;
  const option2Count = `${questionObject.optionTwo.votes.length} out of ${totalVotes}`;

  return { option1Percentage, option2Percentage, option1Count, option2Count };

  return { option1Votes, option2Votes };
};

/**
 * modify timestamp
 *
 * @param {number} time 1467166872634
 * @returns {string}  formattedTimeStamp
 */
export const formatTime = (time) => {
  let formattedTimeStamp;
  let d = new Date(time);
  const timeString = d.toLocaleTimeString("en-US");
  formattedTimeStamp =
    timeString.slice(0, 5) +
    timeString.slice(-2) +
    " | " +
    d.toLocaleDateString();
  return formattedTimeStamp;
};
