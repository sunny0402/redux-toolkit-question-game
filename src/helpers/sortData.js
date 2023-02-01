// TODO: get answered questions
// TODO: get unanswered questions
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

// Note: returns an array of answered & notAnswered question ids for currently authed user
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

// DEBUG
// const { answered, notAnswered } = sortQuestions(auth, questionData, users);
// console.log("answered: ", answered);
// console.log("notAnswered: ", notAnswered);

// Note: sort an array of question objects by timestamp
export const sortByTimestamps = (arrOfQuestions) => {
  return arrOfQuestions.sort((a, b) => b.timestamp - a.timestamp);
};

// Note: modify timestamp attribute of question object in arrOfQuestions
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

// Test
//1. Get array of answered and not answered
const { answeredArr, notAnsweredArr } = sortQuestions(
  auth,
  questionData,
  users
);

//2. Sort by timestamps
const sortedAnswered = sortByTimestamps(answeredArr);
const sortedUnanswered = sortByTimestamps(notAnsweredArr);

//3. Format timestamps
const formattedAnswered = formatDates(sortedAnswered);
const formattedNotAnswered = formatDates(sortedUnanswered);

// console.log("formattedAnswered: ", formattedAnswered);
// console.log("formattedNotAnswered: ", formattedNotAnswered);

// TODO create a LeaderBoard
// TODO; for each user calculate the number of answered questions & unanswered
// TODO: createNewQuestion form ...
// TODO: actions need to be dispatched to update users.id.questions & users.id.answers
