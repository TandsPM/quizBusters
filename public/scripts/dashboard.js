$(document).ready(function() {
  loginStatus();

  // handling login button
  $('#loginButton').on('click', function(event) {
    event.preventDefault();
    // Check if the user is logged in
    if ($('#loginButton').text() === 'Logout') {
      // If logged in, redirect to the dashboard
      window.location.href = '/dashboard';
    } else {
      // If not logged in, redirect to the index page
      window.location.href = '/index';
    }
  });

  // handling logout button
  $('#logoutButton').on('click', function (event) {
    event.preventDefault();
    logoutUser();
  });

  
  //quiz-card links!
  $(".quiz-card").on("click", function ()  {
    const quizId = $(this).attr("class").split(" ")[1]
    window.location.href = `/quiz/${quizId}`;
  })

  // grading quiz
  $('#submitButton').on("click", () => {    
    submitQuiz()
  
    // Scroll to the top of the page with animation
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });

});


// check login status to deny access
function loginStatus() {
  $.ajax({
    method: 'GET',
    url: '/checkLogin',
    success: function(data) {
      if (data.user) {
        $('#quizzesLink').attr('href', '/quizzes');
        $('#quizzesLink').show();
        $('#logoutButton').show();
      } 
    },
    error: function(error) {
      console.log('Error:', error);
    },
  });
}

const submitQuiz = function() {
  
  let selectedOptionIds = [];
  let selectedOptionScores = [];
  let total = Number($('#questionCounter').text())

  console.log("total: ", total)
  $("#myform input[type=radio]:checked").each(function() {
    const temp = $(this).data("correct") ? "true" : "false";
    
    selectedOptionIds.push(this.id);
    selectedOptionScores.push(temp);
  });
  const data = {
    selectedOptionIds,
    selectedOptionScores,
    total
  }
  console.log(data)
  $.ajax({
    url: "http://localhost:8080/quiz/quiz_id",
    data: data,
    type: "POST",
    success: function(result){
      $('#score').slideDown(900).css("display", "block").text(`Your Score is ${result.score}`)
      console.log("Success!", result);
    },
    error: function(err){
      console.log("Error:", err);
    }
  });

};

