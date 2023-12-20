///////////////////////////////////////////////////////////////////////////////////////////////////
////                      Login/Logout functionality                        ////
///////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const db = require('../db/connection');
const { getUserById } = require('../db/queries/users');
const { Pool } = require('pg');

const db = require('../db/connection');


const allowAccess = (req, res, next) => {
  if (req.session && (req.session.user)) {
    next();
  } else {
    res.redirect('/login');
  }
};

// const quizzes = [
//   { id: 1, title: 'Quiz 1', rating: 5 },
//   { id: 2, title: 'Quiz 2', rating: 4 },
// ];

// execute a SELECT query to retrieve all rows from the 'quizzes' table
// const getQuizzesFromDatabase = async () => {
//   try {
//     const result = await db.query('SELECT * FROM quizzes');
//     return result.rows;
//   } catch (error) {
//     console.error('Error fetching quizzes from the database:', error);
//     throw error;
//   }
// };

// router.get('/index', allowAccess, async (req, res) => {
//   try {
//     const quizzes = await getQuizzesFromDatabase();
//     res.render('index', { user_id: req.session.user, quizzes: quizzes });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

router.get('/', allowAccess, (req, res) => {
  const user = req.session.user;
  res.render('dashboard', { user: user });
});

// router.get('/index', allowAccess, async (req, res) => {
//   res.render('index', { user_id: req.session.user, quizzes: quizzes });
// });

router.get('/checkLogin', (req, res) => {
  const user = req.session.user;
  res.json({ user });
});

module.exports = router;
