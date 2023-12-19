////////////////////////////////////////////////////////////////////////////////////////
////                    load .env data into process.env                         ////
////////////////////////////////////////////////////////////////////////////////////////

require('dotenv').config();

////////////////////////////////////////////////////////////////////////////////////////
////                    Server Config Consts and Set Engine                         ////
////////////////////////////////////////////////////////////////////////////////////////

const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');

const morgan = require('morgan');
const cookieSession = require('cookie-session');
// const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

////////////////////////////////////////////////////////////////////////////////////////
////                 Creating Const Routes for each Resource                        ////
////////////////////////////////////////////////////////////////////////////////////////

const quizzesRoutes = require('./routes/quizzes');
const newQuizRoutes = require('./routes/newQuiz');
const myResultsRoutes = require('./routes/my-results');
const profileRoutes = require('./routes/profile');
const favesRoutes = require('./routes/faves');
const indexRoutes = require('./routes/index');
const { getUserById } = require('./db/queries/users');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(cookieSession({
  secret: 'your-secret-key',
  resave: false,
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
////                    Separated Routes for each Resource                          ////
////////////////////////////////////////////////////////////////////////////////////////
// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/quizzes', quizzesRoutes);
app.use('/my-results', myResultsRoutes);
app.use('/profile', profileRoutes);
app.use('/faves', favesRoutes);
app.use('/new-quiz', newQuizRoutes);
app.use('/', indexRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// Login with ID
app.get('/login/:id', (req, res) => {
  const id = req.params.id;
  const user = getUserById(id);

  if (user) {
    req.session.user = user;
    // redirect to the home page after login
    res.redirect('/');
  } else {
    // Handle invalid user ID
    res.status(404).send('User not found');
  }
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
  res.render('login');
  }
});

// Add a route for handling login form submission
app.post('/login', (req, res) => {
  const id = req.body.id;
  const user = getUserById(id);

  if (user) {
    req.session.user = user;
    const redirect = req.query.redirect || '/';

    res.redirect(redirect);
  } else {
    res.status(404).send('User not found');
  }
});

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

app.get('/quizzes', isAuthenticated, (req, res) => {
  res.render('quizzes', { user: req.session.user });
});

// Home page
app.get('/index', isAuthenticated, (req, res) => {
  const user = req.session.user;

  const templateVars = { user: user };
  res.render('index', templateVars);
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  const user = req.session.user;
  const templateVars = { user: user };
  res.render('dashboard', templateVars);
})

// Endpoint to check login status
app.get('/checkLogin', (req, res) => {
  const user = req.session.user;
  res.json({ user });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
