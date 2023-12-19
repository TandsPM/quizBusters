$(document).ready(function () {
  $('#loginButton').on('click', function (event) {
    event.preventDefault();
    window.location.href = '/index';
  });
});

// $(document).on('click', '#loginButton', function (event) {
//   event.preventDefault();
//   console.log('Login button ahas been clicked');
//   window.location.href = '/';
// })
