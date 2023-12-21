-- Drop tables if they exist 

DROP TABLE IF EXISTS quizzes CASCADE;

-- recreate quizzes table 
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  privacy BOOLEAN,
  rating SMALLINT DEFAULT 0
);
