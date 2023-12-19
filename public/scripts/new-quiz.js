// const { application } = require("express");
// const { get } = require("../../routes/newQuiz");

$(document).ready(function() {

  $(document).on('click', '.add-option-btn', addOption);

  $('.add-question-btn').on("click", addQuestion);

  $("#new-title").on("input", updateQuizTitle);

  $("#new-author").on("input", updateQuizAuthor);

  $(".new-quiz-container").on("input", ".question-input", updateQuestion);

  $("#submitButton").on("click", submitNewQuiz);
});

///////////////////////////////////////////////////////////////////////////////////////////////////
////                      Info Functions                             ////
///////////////////////////////////////////////////////////////////////////////////////////////////
let questionNumber = 1;

const updateQuizTitle = function() {
  const inputValue = $(this).val();
  const title = $("#quiz-title");
  // Update the content of the new-quiz-title h1 element
  title.text(inputValue);
};

const updateQuizAuthor = function() {
  const inputValue = $(this).val();
  // Update the content of the new-quiz-autho h1 element
  $("#quiz-author").text(inputValue);
};


///////////////////////////////////////////////////////////////////////////////////////////////////
////                      Option Functions                             ////
///////////////////////////////////////////////////////////////////////////////////////////////////

const addOption = function(event) {
  event.preventDefault(); // Prevent default form submit
  const optionsBox = $(this).siblings("div").last(); // Change class to this question's options box

  console.log("optionsBox.find", optionsBox.find('.new-question-option'));

  // Create a new option input
  const newOptionHtml = `
  <div class="new-question-option">
    <input type="text" name="option" value="[colour]" />
    <input type="radio" class="correct" name="Q${questionNumber}" value="correct">
    <br>
  </div>
  `;
  // Append the new option input to the correct question's options box
  optionsBox.append(newOptionHtml);
};

///////////////////////////////////////////////////////////////////////////////////////////////////
////                      Question Functions                             ////
///////////////////////////////////////////////////////////////////////////////////////////////////

const updateQuestion = function() {
  const input = $(this);
  const text = input.val();
  const div = input.closest("div");
  const questionName = div.find(".question-name");
  questionName.text(text);
};

const addQuestion = function() {
  questionNumber++;
  event.preventDefault();
  const element = createQuestionElement();
  // Append the new question HTML to the "new-questions" section
  $('.new-quiz-questions').append(element);
};

const createQuestionElement = function() {
  const newQuestionHtml = `
  <div class="individual-question">
    <label for="new-question">New Question:</label><br>
    <input type="text" class="question-input" name="question-input" value="What colour is the sky?"><br>
    <h4 class="question-name">What colour is the sky?</h4> 
    <div class="question-options">
      <fieldset>
        <div class="new-question-options-box"> <!-- add new options to here-->
          <div class="new-question-option"><input type="text" name="option" value="Blue" />
            <input type="radio" class="correct" name="Q${questionNumber}" value="correct">
            <br>
          </div>
          <div class="new-question-option"><input type="text" name="option" value="Green" />
            <input type="radio" class="correct" name="Q${questionNumber}" value="correct">
            <br>
          </div>
        </div>
        <button type="button" class="add-option-btn">Add Another Option</button>
      </fieldset>
    </div>
  </div>
  <br>`;
  return $(newQuestionHtml);
};


///////////////////////////////////////////////////////////////////////////////////////////////////
////                      SQL Functions                             ////
///////////////////////////////////////////////////////////////////////////////////////////////////

const collectData = function() {
  const quizTitle = $("#new-title").val();
  const quizAuthor = $("#new-author").val();
  const questions = $(".new-quiz-questions").find(".individual-question");

  const questionNamesArray = [];
  const optionsCountArray = [];
  const optionsArray = [];

// get Question Info
  questions.each(function() {

    const questionElement = $(this);
    const questionName = questionElement.find(".question-input").val();

    questionNamesArray.push(questionName);

// Get Options Info
    const options = questionElement.find(".question-options").find(".new-question-options-box");
    const indvOptions = options.find(".new-question-option");
    let optionsCount = 0
    indvOptions.each(function() {
      optionsCount++
      const optionElement = $(this);
      const optionText = optionElement.find("input[type='text']").val();
      const isCorrect = optionElement.find("input[type='radio'].correct").prop("checked");
      optionsArray.push({ optionText, isCorrect }) 
    });
    optionsCountArray.push(optionsCount)
  });

const data = {
  quizTitle,
  quizAuthor,
  questionNamesArray,
  optionsCountArray,
  optionsArray
};
return data;
}


const submitNewQuiz = function() {
  $.post('/new-quiz', collectData())
    .then(function(data) {
      console.log("Data Received", data);
    })
    .catch(function(err) {
      console.log("Error", err);
    });
};