$(document).ready(function() {

  $(document).on('click', '.add-option-btn', addOption);

  $('.add-question-btn').on("click", addQuestion);
  
  $("#new-title").on("input", updateQuizTitle);
  
  $("#new-author").on("input", updateQuizAuthor);
  
  $(".new-quiz-container").on("input", ".question-input", updateQuestion);
});

///////////////////////////////////////////////////////////////////////////////////////////////////
////                      Info Functions                             ////
///////////////////////////////////////////////////////////////////////////////////////////////////
let questionNumber = 1;

const updateQuizTitle = function() {
  const inputValue = $(this).val();
  const title = $("#quiz-title");
  console.log("quiz-title ", title);
  console.log("inputValue ", inputValue);
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
  questionNumber++
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