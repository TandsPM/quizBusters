// Client facing scripts here


// Quizzes page link
const express = require('express');
const quizzesRouter = require(`./quizzes`);

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/quizzes', quizzesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
