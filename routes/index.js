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

//////////////////////////////////////////////////////////////////////
//// render login page                                            ////
//////////////////////////////////////////////////////////////////////

router.get('/login', (req, res) => {
  if (req.session.user) { //if logged in send to dashboard
    res.redirect('/');
  } else {
    res.render('login'); //if not logged in send to login
  }
})

//////////////////////////////////////////////////////////////////////
//// render login page                                            ////
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

//////////////////////////////////////////////////////////////////////
//// render login page                                            ////
//////////////////////////////////////////////////////////////////////
router.get('/', allowAccess, (req, res) => {
  
  console.log("req.session 1: ", req.session);
  const user = req.session.user;
  res.render('dashboard', { user: user });
});

//////////////////////////////////////////////////////////////////////
//// render login page                                            ////
//////////////////////////////////////////////////////////////////////
router.get('/index', allowAccess, (req, res) => {
  
  console.log("req.session 2: ", req.session);
  res.render('index', { user_id: req.session.user });
});

//////////////////////////////////////////////////////////////////////
//// render login page                                            ////
//////////////////////////////////////////////////////////////////////
router.get('/checkLogin', (req, res) => {
  
  console.log("req.session3: ", req.session);
  const user = req.session.user;
  res.json({ user });
});

module.exports = router;


