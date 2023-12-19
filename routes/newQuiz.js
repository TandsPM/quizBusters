// Quizzes
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'midterm',
  password: '123',
  port: 5432,
});

router.get('/', (req, res) => {
  res.render('new-quiz');
});

router.post('/', (req, res) => {
  return pool.connect()
  // QUIZZES
  .then((user) => {
    const { quizTitle, quizAuthor, questions } = req.body;
    
    return user.query(
      `INSERT INTO quizzes(owner_id, title) VALUES($1, $2) RETURNING id`,
      [userId, quizTitle]
    )
  })

  // // QUESTIONS
  // .then((user) => {
  //   const { quizTitle, quizAuthor, questions } = req.body;
  //   return user.query(
  //     `INSERT INTO questions(
  //       quizzes.id as quiz_id, 
  //       content, 
  //       number_of_options)`
  //   )
  // })

  // // OPTIONS
  // .then((user) => { 
  //   const { quizTitle, quizAuthor, questions } = req.body;
  //   return user.query(
  //     `INSERT INTO options (owner_id, title) `
  //   )
  // })

  // RELEASE
  .then(() => {
    // Release the database connection
    user.release(); 
    res.json({
      success: true,
      message: 'Data successfully inserted into the database.',
    });

  // ERROR HANDLING
  // .catch((error) => {
  //   console.error('Error connecting to the database:', error);
  //   res.status(500).json({
  //     success: false,
  //     message: 'An error occurred while connecting to the database.',
  //   });
  // });
  })
})

module.exports = router;

// CREATE TABLE quizzes (
//   id SERIAL PRIMARY KEY NOT NULL,
//   owner_id INTEGER REFERENCES users(id),
//   title VARCHAR(255) NOT NULL,
//   rating SMALLINT DEFAULT 0
// );
// -- recreate questions table 
// CREATE TABLE questions (
//   id SERIAL PRIMARY KEY NOT NULL,
//   quiz_id INTEGER REFERENCES quizzes(id) NOT NULL,
//   content TEXT,
//   number_of_options INT
// );

// -- recreate options table 
// CREATE TABLE options (
//   id SERIAL PRIMARY KEY NOT NULL,
//   question_id INTEGER REFERENCES questions(id),
//   content TEXT,
//   explanation TEXT,
//   score SMALLINT DEFAULT 0
// );