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
  const owner_id = req.body.user_id; // Assuming you have the user information in the session
  const body = req.body; // Replace with the actual title you want to insert
  const title = body.quizTitle;
  const author = body.quizAuthor;

  console.log("owner_id: ", owner_id);
  console.log("title: ", title);
  console.log("author: ", author);
  const rating = 0;

  const query = `
    INSERT INTO quizzes (owner_id, title, rating)
    VALUES ($1, $2, $3)
    RETURNING *;`;  //   BUILD HERE
  const values = [owner_id, title, rating];

  db.query(query, values)
    .then(data => {
      const newQuiz = {data};
      res.send(newQuiz); // the object being sent back to script
    })
    .then(() => {
      window.location = "http://localhost:8080/"; // the path for the "redirect"
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
        window.location = "http://localhost:8080/new-quiz";
    });
});

module.exports = router;

