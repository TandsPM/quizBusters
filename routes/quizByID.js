// Quizzes
const express = require('express');
const router = express.Router();

const db = require('../db/connection');

const allowAccess = (req, res, next) => {
  if (req.session && (req.session.user)) {
    next();
  } else {
    res.redirect('/login');
  }
};
///////////////////////////////////////////////////////////////////
////          render dashboard                                 ////
///////////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
  res.render('dashboard');
});

///////////////////////////////////////////////////////////////////
////          render /quiz/:quizId                             ////
///////////////////////////////////////////////////////////////////

router.get('/:quizId', (req, res) => {
  // Retrieve the quiz ID from the URL parameters
  const quizId = req.params.quizId;

  const user = req.session.user;
  console.log("quizId: ", quizId);

  const quizQuery = `
  SELECT * FROM quizzes 
  WHERE quizzes.id = '${quizId}';`;
  console.log("quizQuery: ", quizQuery);

  const questionsQuery = `
  SELECT * FROM questions
  JOIN quizzes ON quizzes.id = questions.quiz_id
  WHERE quizzes.id = '${quizId}';`;
  console.log("questionsQuery: ", questionsQuery);

  const optionsQuery = `
  SELECT * FROM options
  JOIN questions ON questions.id = options.question_id
  JOIN quizzes ON quizzes.id = questions.quiz_id
  WHERE quizzes.id = '${quizId}';`;
  console.log("optionsQuery: ", optionsQuery);

  const authorQuery = `
  SELECT name FROM users
  JOIN quizzes ON quizzes.owner_id = users.id
  WHERE quizzes.id = '${quizId}';`;
  console.log("authorQuery: ", authorQuery);

  Promise.all([
    db.query(quizQuery),
    db.query(questionsQuery),
    db.query(optionsQuery),
    db.query(authorQuery)
  ])

    .then(([quizData, questionsData, optionsData, authorData]) => {
      const dashboard = {
        quizData,
        questionsData,
        optionsData,
        authorData
      };
      console.log("dashboard: ", dashboard);
      res.render('quiz_id', {dashboard} );
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

///////////////////////////////////////////////////////////////////
////          post /quiz/:quizId and get result                ////
///////////////////////////////////////////////////////////////////


module.exports = router;
