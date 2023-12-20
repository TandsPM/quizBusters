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


// Login with ID
router.post('/login/:id', (req, res) => {
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

module.exports = router;


