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
  $('#submitQuiz').on("click", () => {
    console.log("Submit!!")
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

