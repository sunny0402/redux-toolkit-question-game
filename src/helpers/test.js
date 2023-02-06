function receiveData({ authedUser, qid, answer }) {
  const newAnswer = { authedUser, qid, answer };
  return newAnswer;
}

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
// TODO return [{userId,answerCount, askCount, score}, ...]
const userScores = (userData) => {
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
  return leaderBoardArr;
};

userScores(users);

let questions = {
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

const atimestamp = questions["8xf0y6ziyjabvozdd253nd"].timestamp;

const formatTime = (time) => {
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

function updateUsers(dataObject) {
  const { authedUser, qid, answer } = dataObject;
  users[authedUser] = {
    ...users[authedUser],
    answers: {
      ...users[authedUser].answers,
      [qid]: answer,
    },
  };
  return users;
}

// Note answer to exisitng question
const newAnswer = {
  authedUser: "sarahedo",
  qid: "xj352vofupe1dqz9emx13r",
  answer: "optionOne",
};

const userResults = updateUsers(newAnswer);

function updateQuestions(answerObject) {
  const { authedUser, qid, answer } = answerObject;
  questions = {
    ...questions,
    [qid]: {
      ...questions[qid],
      [answer]: {
        ...questions[qid][answer],
        votes: questions[qid][answer].votes.concat([authedUser]),
      },
    },
  };
  return questions;
}

const questionResults = updateQuestions(newAnswer);

const qId = "8xf0y6ziyjabvozdd253nd";

let answers = {
  "8xf0y6ziyjabvozdd253nd": "optionOne",
  "6ni6ok3ym7mf1p33lnez": "optionTwo",
  am8ehyc8byjqgar0jgpub9: "optionTwo",
  loxhs1bqm25b708cmbf3g: "optionTwo",
};
