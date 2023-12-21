-- Seed data for the 'users' table
INSERT INTO users (name, email, password) VALUES
  ('John Doe', 'john.doe@example.com', 'password123'),
  ('Jane Smith', 'jane.smith@example.com', 'password'),
  ('Bob Johnson', 'bob.johnson@example.com', 'bobpassword'),
  ('Robin Fleur', 'example@example.com', 'password');

-- Seed data for the 'quizzes' table
INSERT INTO quizzes (owner_id, title, privacy, rating) VALUES
  (1, 'Geography!', false, 4),
  (2, 'Movie Buff Quiz', false, 5),
  (3, 'private test quiz', true, 3),
  (4, 'Science Trivia', false, 3);

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
  (3, 'private question?', 2),
  (4, 'What is the chemical symbol for gold?', 2);

-- Seed data for the 'options' table
INSERT INTO options (question_id, content, correct) VALUES
  (1, 'Paris', true),
  (1, 'Berlin', false),
  (2, 'Paris', false),
  (2, 'Berlin', true),
  (2, 'London', false),
  (3, 'Ottawa', true),
  (3, 'Toronto', false),
  (4, 'Christopher Nolan', true),
  (4, 'Steven Spielberg', false),
  (5, 'Steven Spielberg', false),
  (5, 'Jimmy Cameroon', true),
  (5, 'Christopher Nolan', false),
  (6, 'Steven Spielberg',  false),
  (6, 'Christopher Nolan',  true),
  (6, 'David Kronenberg',  false),
  (8, 'Au', false),
  (8, 'Ag', true);

-- Seed data for the 'answers' table
INSERT INTO answers (quiz_submission_id, question_id, option_id, value) VALUES
  (1, 1, 1, 1),  -- John Doe answered the first question correctly
  (1, 2, 3, 0),  -- John Doe answered the second question incorrectly
  (2, 1, 1, 1),  -- Jane Smith answered the first question correctly
  (2, 2, 4, 0),  -- Jane Smith answered the second question incorrectly
  (3, 1, 2, 0),  -- Bob Johnson answered the first question incorrectly
  (3, 2, 5, 1);   -- Bob Johnson answered the second question correctly
