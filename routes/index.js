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
    res.render('login'); //if logged in send to dashboard
  }
})

//////////////////////////////////////////////////////////////////////
//// post login page                                            ////
//////////////////////////////////////////////////////////////////////
router.post('/login', (req, res) => {
    const id = req.body.id;
    console.log("id: ", id)
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

router.get('/', allowAccess, (req, res) => {
  const user = req.session.user;
  res.render('dashboard', { user: user });
});

router.get('/index', allowAccess, (req, res) => {
  
  console.log("req.session 2: ", req.session);
  res.render('index', { user_id: req.session.user });
});


router.get('/checkLogin', (req, res) => {
  const user = req.session.user;
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


