// Quizzes
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('new-quiz');
});

router.post('/', (req, res) => {
  console.log("router.post test")
  return res.json({
    result: "success"
  })
})

module.exports = router;

