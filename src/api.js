import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

export const getInitialData = async () => {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([appUsers, appQuestions]) => ({
      appUsers,
      appQuestions,
    })
  );
};

export const getUsers = () => {
  return _getUsers();
};

export const getQuestions = () => {
  return _getQuestions();
};

// Note: question.author is assumed to be authedUser
// Returns: res(formattedQuestion)
export const saveQuestion = (question) => {
  return _saveQuestion(question);
};

// Note: updates vote attribute of quetions
// Returns:  res();
export const saveQuestionAnswer = ({ authedUser, qid, answer }) => {
  return _saveQuestionAnswer({ authedUser, qid, answer });
};
