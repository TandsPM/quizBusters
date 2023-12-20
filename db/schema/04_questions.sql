-- Drop tables if they exist 

DROP TABLE IF EXISTS questions CASCADE;

-- recreate quiz_submission table 
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) NOT NULL,
  content TEXT,
  number_of_options INTEGER
);
