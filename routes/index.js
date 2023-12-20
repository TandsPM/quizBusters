///////////////////////////////////////////////////////////////////////////////////////////////////
////                      Login/Logout functionality                        ////
///////////////////////////////////////////////////////////////////////////////////////////////////
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

router.get('/dashboard', allowAccess, (req, res) => {

  const user = req.session.user;
  res.render('dashboard', { user: user });
});


//////////////////////////////////////////////////////////////////////
//// post login by user id                                        ////
//////////////////////////////////////////////////////////////////////

router.post('/login', (req, res) => {
  const id = req.body.id;
  const user = getUserById(id);

  if (user) {
    req.session.user_id = id;
    req.session.user = user;
    // redirect to the home page after login
    res.redirect('/');
  } else {
    // Handle invalid user ID
    res.status(404).send('User not found');
  }
});

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
  res.render('login');
  }
});

// Add a route for handling login form submission
router.post('/login', (req, res) => {
  const id = req.body.id;
  const user = getUserById(id);

  if (user) {
    req.body.user = user;
    const redirect = req.query.redirect || '/';

    res.redirect(redirect);
  } else {
    res.status(404).send('User not found');
  }
});


//////////////////////////////////////////////////////////////////////
//// Endpoint to check login status                               ////
//////////////////////////////////////////////////////////////////////

router.get('/checkLogin', (req, res) => {

  console.log("req.session3: ", req.session);
  const user = req.body.user;
  res.json({ user });
});


//////////////////////////////////////////////////////////////////////
//// Auto populate quizzes                                        ////
//////////////////////////////////////////////////////////////////////

// const pool = new Pool({
//   user: 'labber',
//   host: 'localhost',
//   database: 'midterm',
//   password: '123',
//   port: 5432,
// });

// // pool to execute queries
// const executeQuery = async (query, values) => {
//   const client = await pool.connect();
//   try {
//     return await client.query(query, values);
//   } finally {
//     client.release();
//   }
// };

// router.get('/index', allowAccess, async (req, res) => {
//   try {
//     // Fetch quizzes from the database
//     const result = await executeQuery('SELECT * FROM quizzes WHERE owner_id = $1', [req.session.user_id]);
//     const quizzesFromDB = result.rows;

//     // Render the index page with quizzes
//     res.render('index', { user_id: req.session.user, quizzes: quizzesFromDB });
//   } catch (error) {
//     console.error('Error fetching quizzes:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;


