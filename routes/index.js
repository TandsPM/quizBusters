///////////////////////////////////////////////////////////////////////////////////////////////////
////                      Login/Logout functionality                        ////
///////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const db = require('../db/connection');
const { getUserById } = require('../db/queries/users');

router.use(cookieSession({
  secret: 'your-secret-key',
  resave: true,
  initialSession: true,
}));

//////////////////////////////////////////////////////////////////////
//// Check if Logged in                                           ////
//////////////////////////////////////////////////////////////////////
const allowAccess = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const quizzes = [
  { id: 1, title: 'Quiz 1', rating: 5 },
  { id: 2, title: 'Quiz 2', rating: 4 },
];

router.get('/login/:id', (req, res) => {

  req.session.user_id = req.body.id;
  res.redirect('/');
});

//////////////////////////////////////////////////////////////////////
//// render login page                                            ////
//////////////////////////////////////////////////////////////////////
router.get('/', allowAccess, (req, res) => {
  const user = req.session.user;
  res.render('dashboard', { user: user });
});

router.get('/index', allowAccess, async (req, res) => {
  res.render('index', { user_id: req.session.user, quizzes: quizzes });
});

router.get('/checkLogin', (req, res) => {
  const user = req.session.user;
  res.json({ user });
});

module.exports = router;


