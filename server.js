////////////////////////////////////////////////////////////////////////////////////////
////                    load .env data into process.env                         ////
////////////////////////////////////////////////////////////////////////////////////////

require('dotenv').config();

////////////////////////////////////////////////////////////////////////////////////////
////                    Server Config Consts and Set Engine                         ////
////////////////////////////////////////////////////////////////////////////////////////

const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const db = require('./db/connection');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
// const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
  secret: 'your-secret-key',
  resave: true,
  initialSession: true,
}));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

////////////////////////////////////////////////////////////////////////////////////////
////                 Creating Const Routes for each Resource                        ////
////////////////////////////////////////////////////////////////////////////////////////

const newQuizRoutes = require('./routes/newQuiz');
const profileRoutes = require('./routes/profile');
const indexRoutes = require('./routes/index');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.


////////////////////////////////////////////////////////////////////////////////////////
////           mounting Separated Routes for each Resource                          ////
////////////////////////////////////////////////////////////////////////////////////////
// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
db.connect();
app.use('/profile', profileRoutes);
app.use('/new-quiz', newQuizRoutes);
app.use('/', indexRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/index', isAuthenticated, (req, res) => {
  const user = req.session.user;
  const templateVars = { user: user};

  res.render('index', templateVars);
});

// app.get('/quizzes', isAuthenticated, (req, res) => {
//   res.render('quizzes', { user: req.session.user });
// });

// Home page
app.get('/index', isAuthenticated, (req, res) => {
  const user = req.session.user;

  const templateVars = { user: user };
  res.render('index', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
