-- Drop tables if they exist 

DROP TABLE IF EXISTS quiz_submission CASCADE;

-- recreate quiz_submission table 
CREATE TABLE quiz_submission (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  quiz_id INTEGER REFERENCES quizzes(id),
  total INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0
);


