$(document).ready(function() {

  $(document).on('click', '.add-option-btn', addOption);
  $('.add-question-btn').on("click", addQuestion);
  $("#new-title").on("input", updateQuizTitle);
  $("#new-author").on("input", updateQuizAuthor);
  $("#new-author").on("input", updateQuizAuthor);
});

let questionCounter = 1; // Start after the first question

const updateQuizTitle = function() {
  const inputValue = $(this).val();
  // Update the content of the new-quiz-title h1 element
  $("#new-quiz-title").text(inputValue);
};

const updateQuizAuthor = function() {
  const inputValue = $("#new-author-form").val();
  // Update the content of the new-quiz-autho h1 element
  $("#new-quiz-author").text(inputValue);
};

const updateQuestion1 = function() { // NEED TO MAKE UPDATEQUESTION*
  const inputValue = $(".new-question").val();
  // Update the content of the new-question-1 h1 element
  $d("#new-question-1").text(inputValue);
};


const addOption = function(event) {
  event.preventDefault(); // Prevent default form submit
  const optionsBox = $(this).siblings("div").last(); // Change to class of your question options
  const optionCounter = optionsBox.find('.new-question-option').length + 1; // Count existing options
  console.log("optionsBox.find", optionsBox.find('.new-question-option'))

  // Create a new option input
  const newOptionHtml = `
    <div class="new-question-option">
    <input type="text" name="option-${optionCounter}" value="option-${optionCounter}" />
    </div>
`;
  // Append the new option input to the correct question's options box
  optionsBox.append(newOptionHtml);
};

const optionCounter = function() {
  
}

const addQuestion = function() {
  event.preventDefault();
  // Increment the question counter for unique question-ids
  questionCounter++;

  // Create a new question form
  const newQuestionHtml = `
   <form>
    <label for="new-question-form-${questionCounter}">
    Question ${questionCounter}:</label><br>
      <input type="text" class="new-question-form-${questionCounter}" name="new-question-form-${questionCounter}" value="Whats up?" onkeyup="updateQuestion${questionCounter}()"><br>
    </form>
    <h4 class="new-question-${questionCounter}">What's up?</h4>
    <div class="question-${questionCounter}-options">
    <fieldset>
      <div class="new-question-options-box">
        <div class="new-question-option"><input type="text" name="option-1" value="option-1" /></div>
        <div class="new-question-option"><input type="text" name="option-2" value="option-2" /></div>
        <button class="add-option-btn">Add Another option</button>
        </div>
        </fieldset>
        <br>
        </div>`;

  // Append the new question HTML to the "new-questions" section
  $('.new-quiz-questions').append(newQuestionHtml);
};