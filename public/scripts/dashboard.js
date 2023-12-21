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

  //quiz-card links!
  $(".quiz-card").on("click", function ()  {
    const quizId = $(this).attr("class").split(" ")[1]
    window.location.href = `/quiz/${quizId}`;
  })

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
        $('#loginButton').text('Logout');
      } else {
        $('#loginButton').text('Login');
        // .on('click', function (event) {
        //   event.preventDefault();
        //   window.location.href = '/login';
        // });
      }
    },
    error: function(error) {
      console.log('Error:', error);
    },
  });
}