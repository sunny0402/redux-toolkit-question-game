let questionData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sarahedo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sarahedo"],
      text: "have horrible short term memory",
    },
    optionTwo: {
      votes: [],
      text: "have horrible long term memory",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "johndoe",
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: "become a superhero",
    },
    optionTwo: {
      votes: ["johndoe", "sarahedo"],
      text: "become a supervillain",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "sarahedo",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "be telekinetic",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "be telepathic",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "tylermcginnis",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "be a front-end developer",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "be a back-end developer",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "tylermcginnis",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["tylermcginnis"],
      text: "find $50 yourself",
    },
    optionTwo: {
      votes: ["johndoe"],
      text: "have your best friend find $500",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "johndoe",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["johndoe"],
      text: "write JavaScript",
    },
    optionTwo: {
      votes: ["tylermcginnis"],
      text: "write Swift",
    },
  },
};

let users = {
  sarahedo: {
    id: "sarahedo",
    name: "Sarah Edo",
    avatarURL: "/images/avatar1.jpeg",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  tylermcginnis: {
    id: "tylermcginnis",
    name: "Tyler McGinnis",
    avatarURL: "/images/avatar2.jpeg",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  johndoe: {
    id: "johndoe",
    name: "John Doe",
    avatarURL: "/images/avatar1.jpeg",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
    },
    questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
};

const auth = "johndoe";
// console.log("auth: ", auth);

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

// Test
//1. Get array of answered and not answered
// const { answeredArr, notAnsweredArr } = sortQuestions(
//   auth,
//   questionData,
//   users
// );

//2. Sort by timestamps
// const sortedAnswered = sortByTimestamps(answeredArr);
// const sortedUnanswered = sortByTimestamps(notAnsweredArr);

//3. Format timestamps
// const formattedAnswered = formatDates(sortedAnswered);
// const formattedNotAnswered = formatDates(sortedUnanswered);

// console.log("formattedAnswered: ", formattedAnswered);
// console.log("formattedNotAnswered: ", formattedNotAnswered);
