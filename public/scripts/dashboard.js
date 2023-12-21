$(document).ready(function () {
  loginStatus();

  // handling login button
  $('#loginButton').on('click', function (event) {
    event.preventDefault();
    window.location.href = '/index';
  });

  // handling logout button
  $('#logoutButton').on('click', function (event) {
    event.preventDefault();
    logoutUser();
  });

// check login status to deny access
function loginStatus() {
  $.ajax({
    method: 'GET',
    url: '/checkLogin',
    success: function (data) {
      if (data.user) {
        $('#quizzesLink').attr('href', '/quizzes');
        $('#quizzesLink').show();
        $('#logoutButton').show();

      } else {
        $('#loginButton').on('click', function (event) {
          event.preventDefault();
          window.location.href = '/login';
        });
      }
    },
    error: function (error) {
      console.log('Error:', error);
    },
  });
}
});

