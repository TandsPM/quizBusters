// my results
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('my-results');
});

module.exports = router;
