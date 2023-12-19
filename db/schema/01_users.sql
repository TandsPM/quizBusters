-- Drop tables if they exist 

DROP TABLE IF EXISTS users CASCADE;


-- recreate quizzes table 
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
