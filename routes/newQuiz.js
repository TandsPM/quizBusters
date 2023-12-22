// new quiz

///////////////////////////////////////////////////////////////////////////////////////////////////
////                     Imports and mounting                                                  ////
///////////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();
const db = require('../db/connection');


///////////////////////////////////////////////////////////////////////////////////////////////////
////                      Render The Site                                                      ////
///////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('new-quiz', user);
});



///////////////////////////////////////////////////////////////////////////////////////////////////
////                      SQL Post                                                        ////
///////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/', (req, res) => {
  const owner_id = req.session.user_id;
  const body = req.body;
  const title = body.quizTitle;
  const author = body.quizAuthor;
  const privacy = body.privacy

  console.log("privacy: ", privacy);
  // console.log("information to submit:", "owner_id", owner_id, "body", body )

  const quizValues = [owner_id, author, title, privacy, 0]; // add privacy to values, query and as variable
  db.query(`
    INSERT INTO quizzes (owner_id, author, title, privacy, rating) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`, quizValues)

    .then((quizData) => {
      const questions = body.questionNamesArray;
      let optionsCount = 0
      for (let i = 0; i < questions.length; i++) {
        const questionsValues = [quizData.rows[0].id, questions[i], body.optionsCountArray[i]];
        db.query(`
        INSERT INTO questions (quiz_id, content, number_of_options) 
        VALUES ($1, $2, $3)
        RETURNING *;`, questionsValues
        )

          .then((questionData) => {
            const options = body.optionsArray;
            const cap = (Number(optionsCount) + Number(body.optionsCountArray[i]))
            for (let u = optionsCount; u < cap; u++) {

              const optionsValues = [questionData.rows[0].id, options[u].optionText, options[u].isCorrect];
              db.query(`
              INSERT INTO options (question_id, content, correct) 
              VALUES ($1, $2, $3)
              RETURNING *;`, optionsValues
              )
              .then((optionsData) => {
              })
            }
            optionsCount += Number(body.optionsCountArray[i]);
          });
      }
    })
    .then(() => {
      res.json({ redirect: 'http://localhost:8080/' }); // Redirect after successful insertion
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
      res.json({ redirect: 'http://localhost:8080/new-quiz"' }); // Redirect on error
    });
});

module.exports = router;




