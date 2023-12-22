-- Drop tables if they exist 

DROP TABLE IF EXISTS answers CASCADE;

-- recreate answers table 
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_submission_id INTEGER REFERENCES quiz_submission(id),
  question_id INTEGER REFERENCES questions(id),
  option_id INTEGER REFERENCES options(id),
  value INTEGER DEFAULT 0
);


