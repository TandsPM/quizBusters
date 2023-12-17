const { users } = require('./express_server');

const generateRandomString = function() {
  return Math.random().toString(36).substring(2, 7);
};
const getUserByEmail = function(users, email) {
  for (const user in users) {
    if (users[user].email === email) {
      return user;
    }
  } return false;
};

const checkLogIn = function(users, cookie) {
  for (let userId in users) {
    if (users[userId].id === cookie.userId) {
      return true;
    }
  }
  return false;
};

const fetchUserQuizzes = (quizDatabase, userId) => {
  let userQuizzes = {};
  
  // for (let quiz in quizDatabase) {
  //   // // console.log('quiz', quiz)
  //   // console.log('urlDatabase', urlDatabase)
  //   // console.log('urlDatabase[shortUrl].longURL', urlDatabase[shortUrl].longURL)
  //   if (quizDatabase[shortUrl].userId == userId) {
  //     userUrls[shortUrl] = urlDatabase[shortUrl].longURL;
  //   }
  // }
  // return userUrls;
};

module.exports = { generateRandomString, getUserByEmail, checkLogIn, fetchUserUrls }

