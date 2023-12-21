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
        authorData
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


router.post('/:quizId', (req, res) => {
  const user_id = req.session.user.id; // Assumes user ID is stored in the session
  const quiz_id = req.params.quizId;
  const userAnswers = req.body.userAnswers; // Assumes the user's answers are sent in the request body

  // Calculate total and total_score based on user's answers (logic in need of adjusting)
  const total = Object.keys(userAnswers).length;
  const total_score = calculateTotalScore(userAnswers);

  const insertSubmissionQuery = `
    INSERT INTO quiz_submission (user_id, quiz_id, total, total_score)
    VALUES ('${user_id}', '${quiz_id}', '${total}', '${total_score}')
    RETURNING id;`;

  db.query(insertSubmissionQuery)
    .then(result => {
      const submissionId = result.rows[0].id;
      res.redirect(`/quiz/${quiz_id}/result/${submissionId}`);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Function to calculate total score 
function calculateTotalScore(userAnswers) {
  // Add  scoring logic here
  // Example: Loop through userAnswers and calculate the score
  let totalScore = 0;
  for (const questionId in userAnswers) {
    // Add scoring logic based on correct/incorrect answers
    // Example: totalScore += (userAnswers[questionId] === correctAnswer) ? 1 : 0;
  }
  return totalScore;
}



module.exports = router;
