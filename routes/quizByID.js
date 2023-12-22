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

  const user = req.session.user_id;
  
  const quizQuery = `
  SELECT * FROM quizzes 
  WHERE quizzes.id = '${quizId}';`;

  const questionsQuery = `
  SELECT questions.id as question_id, questions.content as question_content, number_of_options, questions.quiz_id as quiz_id FROM questions
  LEFT JOIN quizzes ON quizzes.id = questions.quiz_id
  WHERE quizzes.id = '${quizId}';`;

  const optionsQuery = `
  SELECT options.id as option_id, questions.id as question_id, options.content as option_content,  correct FROM options
  LEFT JOIN questions ON questions.id = options.question_id
  LEFT JOIN quizzes ON quizzes.id = questions.quiz_id
  WHERE quizzes.id = '${quizId}';`;

  const authorQuery = `
  SELECT name FROM users
  LEFT JOIN quizzes ON quizzes.owner_id = users.id
  WHERE quizzes.id = '${quizId}';`;

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
        authorData,
        user
      };
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


router.post('/:quiz_id', (req, res) => {
  const user_id = req.session.user_id; // Assumes user ID is stored in the session
  
  const reqBody = req.body;
  console.log("body ", reqBody);
  const selections = reqBody.selectedOptionIds
  const correctAnswers = reqBody.selectedOptionScores
  const total = req.body.total
  console.log("selections: ", selections)
  console.log("correctAnswers: ", correctAnswers);
  let score = 0;
  for (i = 0; i < selections.length; i++){
    console.log ("correctAnswers[i]: ", correctAnswers[i].length)
    if (correctAnswers[i].length < 5){
      score ++
    }
  }
  res.json({ score: `${score} / ${total}` })
});




module.exports = router;

