///////////////////////////////////////////////////////////////////////////////////////////////////
////                      Login/Logout functionality                        ////
///////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();

const allowAccess = (req, res, next) => {
  if (req.session && (req.session.user)) {
    next();
  } else {
    res.redirect('/login');
  }
};

router.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

router.get('/', allowAccess, (req, res) => {
  const user = req.session.user;
  res.render('dashboard', { user: user });
});

router.get('/index', allowAccess, (req, res) => {
  res.render('index', { user_id: req.session.user });
});

router.get('/checkLogin', (req, res) => {
  const user = req.session.user;
  res.json({ user });
});

module.exports = router;
