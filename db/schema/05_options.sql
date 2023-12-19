-- Drop tables if they exist 

DROP TABLE IF EXISTS options CASCADE;

-- recreate options table 
CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id),
  content TEXT,
  explanation TEXT,
  correct BOOLEAN
);

