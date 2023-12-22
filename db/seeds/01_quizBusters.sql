-- Seed data for the 'users' table
INSERT INTO users (name, email, password) VALUES
  ('John Doe', 'john.doe@example.com', 'password123'),
  ('Jane Smith', 'jane.smith@example.com', 'password'),
  ('Bob Johnson', 'bob.johnson@example.com', 'bobpassword'),
  ('Robin Fleur', 'example@example.com', 'password');

-- Seed data for the 'quizzes' table
INSERT INTO quizzes (owner_id, author, title, privacy, rating) VALUES
  (1, 'John Hancock', 'Geography!', false, 4),
  (2, 'Doug Ford', 'Movie Buff Quiz', false, 5),
  (3, 'Tandra Malm', 'private test quiz', true, 3),
  (4, 'Robin Fleur', 'Science Trivia', false, 3);

-- Seed data for the 'quiz_submission' table
-- INSERT INTO quiz_submission (user_id, quiz_id, total, total_score) VALUES
--   (1, 1, 10, 8),
--   (2, 2, 15, 12),
--   (3, 3, 8, 6);

-- Seed data for the 'questions' table
INSERT INTO questions (quiz_id, content, number_of_options) VALUES
  (1, 'What is the capital of France?', 2),
  (1, 'What is the capital of Germany?', 3),
  (1, 'What is the capital of Canada?', 2),
  (2, 'Who directed the movie "Inception"?', 2),
  (2, 'Who directed the movie "Titanic"?', 2),
  (2, 'Who directed the movie "The Dark Knight"?', 3),
  (3, 'who can see this?', 2),
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
  (7, 'Anyone', false),
  (7, 'People with the link', true),
  (8, 'Au', false),
  (8, 'Ag', true);

-- Seed data for the 'answers' table
