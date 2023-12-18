// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');

const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const quizzesRoutes = require('./routes/quizzes');
const myResultsRoutes = require('./routes/my-results');
const profileRoutes = require('./routes/profile');
const favesRoutes = require('./routes/faves');
const newQuizRoutes = require('./routes/newQuiz');
const { getUserById } = require('./db/queries/users');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/quizzes', quizzesRoutes);
app.use('/my-results', myResultsRoutes);
app.use('/profile', profileRoutes);
app.use('/faves', favesRoutes);
app.use('/new-quiz', newQuizRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get('/', (req, res) => {
  const user = req.session.user;
  if (user) {
    const templateVars = { user: user };
    res.render('index', templateVars);
  } else {
    res.redirect('/login');
  }
  // res.render('index');
});

app.get('/login', (req, res) => {
  const id = req.query.id;
  const user = getUserById(id);

  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/login', (req, res) => {
  res.redirect('/');
})

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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


