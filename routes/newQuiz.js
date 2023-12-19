// Quizzes

router.get('/', (req, res) => {
  res.render('new-quiz');
});
const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `INSERT * FROM `; //BUILD HERE
  console.log(query);
  db.query(query)
    .then(data => {
      const newQuiz = {data.rows};
      res.send(object); // the object being sent back to script
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

module.exports = router;

