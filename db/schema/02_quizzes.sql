-- Drop tables if they exist 

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS quiz_submission CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS options CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS widgets CASCADE;

-- recreate users table 
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- recreate quizzes table 
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  rating SMALLINT DEFAULT 0
);

-- recreate quiz_submission table 
CREATE TABLE quiz_submission (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  quiz_id INTEGER REFERENCES quizzes(id),
  total INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0
);

-- recreate questions table 
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) NOT NULL,
  content TEXT,
  number_of_options INT
);

-- recreate options table 
CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id),
  content TEXT,
  explanation TEXT,
  correct BOOLEAN
);

-- recreate answers table 
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_submission_id INTEGER REFERENCES quiz_submission(id),
  question_id INTEGER REFERENCES questions(id),
  option_id INTEGER REFERENCES options(id),
  value INTEGER DEFAULT 0
);

