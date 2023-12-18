// my results
const express = require('express');
const router = express.Router();

router.get('/login/:id', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // or using plain-text cookies
  res.cookie('user_id', req.params.id);

  console.log('Testing:', req.params.id);

  // send the user somewhere
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('/', { user_id: req.session.user_id || req.cookies.user_id });
});

module.exports = router;
