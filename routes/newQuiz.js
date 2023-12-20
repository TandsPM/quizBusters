// new quiz

///////////////////////////////////////////////////////////////////////////////////////////////////
////                     Imports and mounting                                                  ////
///////////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


///////////////////////////////////////////////////////////////////////////////////////////////////
////                      Render The Site                                                      ////
///////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('new-quiz', user);
});



///////////////////////////////////////////////////////////////////////////////////////////////////
////                      SQL Post?                                                            ////
///////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/', (req, res) => {
  const owner_id = req.session.user_id;
  const body = req.body;
  const title = body.quizTitle;

  // Start building the dynamic query
  let query = `
    WITH new_quiz AS (
      INSERT INTO quizzes (owner_id, title, rating)
      VALUES ($1, $2, $3)
      RETURNING *
    )
  `;

  const values = [
    owner_id,
    title,
    0, // rating
  ];

  // Iterate over questions and options to dynamically build the query
  for (let i = 0; i < body.questionNamesArray.length; i++) {
    const questionContent = body.questionNamesArray[i];
    const numberOfOptions = body.optionsCountArray[i];

    // Insert into questions table
    query += `
      INSERT INTO questions (quiz_id, content, number_of_options)
      VALUES ((SELECT id FROM new_quiz), $${values.length + 1}, $${values.length + 2})
      RETURNING id AS question_id;
    `;

    values.push(questionContent, numberOfOptions);

    // Capture question_id from the previous query
    query += `
      WITH new_question AS (
        ${query}
      )
    `;

    // Iterate over options for each question
    for (let j = 0; j < numberOfOptions; j++) {
      const option = body.optionsArray[i * numberOfOptions + j];

      // Insert into options table
      query += `
        INSERT INTO options (question_id, content, correct)
        VALUES ((SELECT question_id FROM new_question), $${values.length + 1}, $${values.length + 2})
        RETURNING *;
      `;

      values.push(option.optionText, option.isCorrect);
    }
  }
console.log("Generated Query: ", query)
console.log("Query Values:", values);
  db.query(query, values)
    .then(data => {
      const newQuiz = { data };
      res.send(newQuiz);
    })
    .then(() => {
      res.redirect("http://localhost:8080/"); // Redirect after successful insertion
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
      res.redirect("http://localhost:8080/new-quiz"); // Redirect on error
    });
});

module.exports = router;




