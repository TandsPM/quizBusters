-- Seed data for the 'users' table
INSERT INTO users (name, email, password) VALUES
  ('John Doe', 'john.doe@example.com', 'password123'),
  ('Jane Smith', 'jane.smith@example.com', 'password'),
  ('Bob Johnson', 'bob.johnson@example.com', 'bobpassword'),
  ('Robin Fleur', 'example@example.com', 'password');

-- Seed data for the 'quizzes' table
INSERT INTO quizzes (owner_id, title, rating) VALUES
  (1, 'Geography!', 4),
  (2, 'Movie Buff Quiz', 5),
  (3, 'Science Trivia', 3);

-- Seed data for the 'quiz_submission' table
INSERT INTO quiz_submission (user_id, quiz_id, total, total_score) VALUES
  (1, 1, 10, 8),
  (2, 2, 15, 12),
  (3, 3, 8, 6);

-- Seed data for the 'questions' table
INSERT INTO questions (quiz_id, content, number_of_options) VALUES
  (1, 'What is the capital of France?', 2),
  (1, 'What is the capital of Germany?', 3),
  (1, 'What is the capital of Canada?', 2),
  (2, 'Who directed the movie "Inception"?', 2),
  (2, 'Who directed the movie "Titanic"?', 2),
  (2, 'Who directed the movie "The Dark Knight"?', 3),
  (3, 'What is the chemical symbol for gold?', 2);

-- Seed data for the 'options' table
INSERT INTO options (question_id, content, explanation, correct) VALUES
  (1, 'Paris', 'Correct answer!', true),
  (1, 'Berlin', 'Incorrect answer', false),
  (2, 'Paris', 'Incorrect answer', false),
  (2, 'Berlin', 'Correct answer!', true),
  (2, 'London', 'Incorrect answer!', false),
  (3, 'Ottawa', 'Correct answer!', true),
  (3, 'Toronto', 'Incorrect answer', false),
  (4, 'Christopher Nolan', 'Correct answer!', true),
  (4, 'Steven Spielberg', 'Incorrect answer', false),
  (5, 'Steven Spielberg', 'Correct answer!', true),
  (5, 'Christopher Nolan', 'Incorrect answer', false),
  (6, 'Steven Spielberg', 'Incorrect answer!', false),
  (6, 'Christopher Nolan', 'Correct answer', true),
  (6, 'David Kronenberg', 'Incorrect answer!', false),
  (7, 'Au', 'Incorrect answer', false),
  (7, 'Ag', 'Correct answer!', true);

-- Seed data for the 'answers' table
INSERT INTO answers (quiz_submission_id, question_id, option_id, value) VALUES
  (1, 1, 1, 1),  -- John Doe answered the first question correctly
  (1, 2, 3, 0),  -- John Doe answered the second question incorrectly
  (2, 1, 1, 1),  -- Jane Smith answered the first question correctly
  (2, 2, 4, 0),  -- Jane Smith answered the second question incorrectly
  (3, 1, 2, 0),  -- Bob Johnson answered the first question incorrectly
  (3, 2, 5, 1);   -- Bob Johnson answered the second question correctly
