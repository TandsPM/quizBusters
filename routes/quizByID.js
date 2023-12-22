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


router.post('/:quiz_id', (req, res) => {
  const user_id = req.session.user_id; // Assumes user ID is stored in the session
  
  const quiz_id = req.params.quiz_id;
  // const userAnswers = req.body.userAnswers; // Assumes the user's answers are sent in the request body
  const reqBody = req.body;
  console.log("user_id: ", user_id)
  console.log("quiz_id: ", quiz_id);
  console.log("body ", reqBody);
  // console.log("userAnswers: ", userAnswers);
  
  
  // console.log("information to submit:", "user_id", user_id, "body", body )
  // Calculate total and total_score based on user's answers (logic in need of adjusting)
  // const total = Object.keys(userAnswers).length;
  // const total_score = calculateTotalScore(userAnswers);

  // const insertSubmissionQuery = `
  //   INSERT INTO quiz_submission (user_id, quiz_id, total, total_score)
  //   VALUES ('${user_id}', '${quiz_id}', '${total}', '${total_score}')
  //   RETURNING id;`;

  // db.query(insertSubmissionQuery)
  //   .then(result => {
  //     const submissionId = result.rows[0].id;
  //     res.redirect(`/quiz/${quiz_id}/result/${submissionId}`);
  //   })
  //   .catch(err => {
  //     res.status(500).json({ error: err.message });
  //   });
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


// router.post('/', (req, res) => {
//   const owner_id = req.session.user_id;
//   const body = req.body;
//   const title = body.quizTitle;
//   const author = body.quizAuthor;
  
//   console.log("body: ", body);
//   // console.log("information to submit:", "owner_id", owner_id, "body", body )

//   const quizValues = [owner_id, title, 0]; // add privacy to values, query and as variable
//   db.query(`
//     INSERT INTO quizzes (owner_id, title, rating) 
//     VALUES ($1, $2, $3)
//     RETURNING *;`, quizValues)

//     .then((quizData) => {
//       const questions = body.questionNamesArray;
//       let optionsCount = 0
//       for (let i = 0; i < questions.length; i++) {
//         const questionsValues = [quizData.rows[0].id, questions[i], body.optionsCountArray[i]];
//         db.query(`
//         INSERT INTO questions (quiz_id, content, number_of_options) 
//         VALUES ($1, $2, $3)
//         RETURNING *;`, questionsValues
//         )

//           .then((questionData) => {
//             const options = body.optionsArray;
//             const cap = (Number(optionsCount) + Number(body.optionsCountArray[i]))
//             for (let u = optionsCount; u < cap; u++) {

//               const optionsValues = [questionData.rows[0].id, options[u].optionText, options[u].isCorrect];
//               db.query(`
//               INSERT INTO options (question_id, content, correct) 
//               VALUES ($1, $2, $3)
//               RETURNING *;`, optionsValues
//               )
//               .then((optionsData) => {
//               })
//             }
//             optionsCount += Number(body.optionsCountArray[i]);
//           });
//       }
//     })
//     .then(() => {
//       res.json({ redirect: 'http://localhost:8080/' }); // Redirect after successful insertion
//     })
//     .catch(err => {
//       res.status(500).json({ error: err.message });
//       res.json({ redirect: 'http://localhost:8080/new-quiz"' }); // Redirect on error
//     });
// });
