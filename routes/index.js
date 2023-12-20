////////////////////////////////////////////////////////////////////////////////
////                      Login/Logout functionality                        ////
////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const db = require('../db/connection');
const { getUserById } = require('../db/queries/users');
const { Pool } = require('pg');

router.use(cookieSession({
  secret: 'your-secret-key',
  resave: true,
  initialSession: true,
}));

const allowAccess = (req, res, next) => {
  if (req.session && (req.session.user)) {
    next();
  } else {
    res.redirect('/login');
  }
};

//////////////////////////////////////////////////////////////////////
//// render login page                                            ////
//////////////////////////////////////////////////////////////////////

router.get('/login', (req, res) => {
  if (req.session.user) { //if logged in send to dashboard
    res.redirect('/');
  } else {
    res.render('login'); //if not logged in send to dashboard
  }
});

//////////////////////////////////////////////////////////////////////
//// render dashboard page                                        ////
//////////////////////////////////////////////////////////////////////

router.get('/dashboard', (req, res) => {
  if (req.session.user) { //if logged in send to dashboard
    res.redirect('/');
  } else {
    res.render('login'); //if not logged in send to dashboard
  }
});

//////////////////////////////////////////////////////////////////////
//// post login page                                              ////
//////////////////////////////////////////////////////////////////////

router.post('/login', (req, res) => {
  const id = req.body.id;
  console.log("id: ", id);
  const user = getUserById(id);
  req.session.user_id = req.body.id;
  req.session.user = user;
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.get('/login/:id', (req, res) => {


  req.session.user_id = req.body.id;
  res.redirect('/');
});


router.get('/index', allowAccess, (req, res) => {

  console.log("req.session 2: ", req.session);
  res.render('index', { user_id: req.session.user });
});


router.get('/checkLogin', (req, res) => {
  const user = req.session.user;
  res.json({ user });
});


///////////////////////////////////////////////////////////////////////
////    Auto populate quizzes                                      ////
///////////////////////////////////////////////////////////////////////

router.get('/', allowAccess, (req, res) => {
  const user = req.session.user;
  console.log("user: ", user);

  const quizQuery = `SELECT * FROM quizzes;`;
  const questionsQuery = `SELECT * FROM questions;`;
  const optionsQuery = `SELECT * FROM options;`;

  Promise.all([
    db.query(quizQuery),
    db.query(questionsQuery),
    db.query(optionsQuery)
  ])

    .then(([quizData, questionsData, optionsData])=> {
      const dashboard = {
        quizData, 
        questionsData, 
        optionsData};
      res.render('dashboard', { user, dashboard });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;



